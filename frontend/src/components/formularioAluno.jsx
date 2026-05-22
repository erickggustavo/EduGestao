import React, { useState } from 'react';
import { 
  UserPlus, 
  User, 
  BookOpen, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Loader2
} from 'lucide-react';

function FormularioAluno() {
    const [aluno, setAluno] = useState({
        nome: '',
        notas: ['', '', '', '', ''],
        frequencia: ''
    });

    const [enviando, setEnviando] = useState(false);
    const [errosNotas, setErrosNotas] = useState(['', '', '', '', '']);
    
    // Novo estado para substituir os "alerts" nativos por mensagens na tela
    const [notificacao, setNotificacao] = useState({ visivel: false, tipo: '', mensagem: '' });

    const mostrarNotificacao = (tipo, mensagem) => {
        setNotificacao({ visivel: true, tipo, mensagem });
        setTimeout(() => setNotificacao({ visivel: false, tipo: '', mensagem: '' }), 5000);
    };

    const validarNota = (valor) => {
        if (valor === '') return ''; 
        const notaString = valor.toString().replace(',', '.');
        const notaNum = parseFloat(notaString);
        
        if (isNaN(notaNum)) return 'Inválido';
        if (notaNum < 0 || notaNum > 10) return '0 a 10';
        return ''; 
    };

    const handleNotaChange = (index, valor) => {
        if (valor === '' || /^[\d,.]*$/.test(valor)) {
            const novasNotas = [...aluno.notas];
            novasNotas[index] = valor;
            setAluno(prev => ({ ...prev, notas: novasNotas }));
            
            const mensagemErro = validarNota(valor);
            const novosErros = [...errosNotas];
            novosErros[index] = mensagemErro;
            setErrosNotas(novosErros);
        }
    };

    const handleChange = (campo, valor) => {
        setAluno(prev => ({ ...prev, [campo]: valor }));
        if (notificacao.visivel) setNotificacao({ visivel: false, tipo: '', mensagem: '' });
    };

    const temErrosNotas = () => errosNotas.some(erro => erro !== '');

    const enviarParaAPI = async (alunoData) => {
        setEnviando(true);
        try {
            const response = await fetch('http://localhost:8080/api/alunos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alunoData),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao conectar com o servidor');
            }
            
            mostrarNotificacao('sucesso', 'Aluno matriculado com sucesso!');
            
            setAluno({ nome: '', notas: ['', '', '', '', ''], frequencia: '' });
            setErrosNotas(['', '', '', '', '']);
            
        } catch (error) {
            mostrarNotificacao('erro', `Erro ao salvar: ${error.message}`);
        } finally {
            setEnviando(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (temErrosNotas()) {
            mostrarNotificacao('erro', 'Corrija as notas destacadas em vermelho antes de enviar.');
            return;
        }

        if (!aluno.nome.trim()) {
            mostrarNotificacao('erro', 'O nome do aluno é obrigatório.');
            return;
        }

        if (!aluno.frequencia) {
            mostrarNotificacao('erro', 'A frequência do aluno é obrigatória.');
            return;
        }

        const notasNormalizadas = aluno.notas.map(nota => {
            if (!nota) return 0.0;
            const notaNum = parseFloat(nota.toString().replace(',', '.'));
            return isNaN(notaNum) ? 0.0 : Math.max(0, Math.min(10, parseFloat(notaNum.toFixed(1))));
        });

        const frequenciaNormalizada = parseFloat(aluno.frequencia.toString().replace(',', '.')) || 0.0;

        const dadosParaBackend = {
            nomeAluno: aluno.nome.trim(),
            notas: notasNormalizadas,
            frequencia: Math.max(0, Math.min(100, frequenciaNormalizada))
        };

        await enviarParaAPI(dadosParaBackend);
    };

    return (
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100/60 overflow-hidden max-w-4xl mx-auto">
            
            {/* Header do Formulário */}
            <div className="bg-slate-50 border-b border-slate-100 p-6 md:p-8 flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                    <UserPlus className="w-7 h-7" strokeWidth={2} />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Nova Matrícula</h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">Preencha os dados acadêmicos para registrar o aluno no sistema.</p>
                </div>
            </div>

            {/* Notificação Inline (Substitui o Alert) */}
            {notificacao.visivel && (
                <div className={`mx-6 md:mx-8 mt-6 p-4 rounded-xl flex items-start gap-3 border ${
                    notificacao.tipo === 'erro' 
                        ? 'bg-rose-50 border-rose-200 text-rose-700' 
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                } animate-slide-up`}>
                    {notificacao.tipo === 'erro' ? <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
                    <p className="font-medium text-sm">{notificacao.mensagem}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                
                {/* Campo: Nome */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        Nome Completo
                    </label>
                    <input 
                        type="text" 
                        value={aluno.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        placeholder="Ex: João da Silva"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
                    />
                </div>

                {/* Grade Dividida: Notas e Frequência */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Seção: Notas (Ocupa 8 colunas) */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-slate-400" />
                                Notas das Disciplinas
                            </label>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">0.0 a 10.0</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10 group-focus-within:text-indigo-600 transition-colors">
                                        Mod {index + 1}
                                    </div>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={aluno.notas[index]}
                                        onChange={(e) => handleNotaChange(index, e.target.value)}
                                        placeholder="-"
                                        className={`w-full relative z-0 bg-transparent border text-center rounded-xl px-2 py-3 outline-none transition-all font-bold text-slate-700 ${
                                            errosNotas[index] 
                                                ? 'border-rose-300 bg-rose-50 text-rose-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30' 
                                                : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
                                        }`}
                                    />
                                    {errosNotas[index] && (
                                        <div className="absolute -bottom-5 left-0 right-0 text-center text-[10px] font-bold text-rose-500">
                                            {errosNotas[index]}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seção: Frequência (Ocupa 4 colunas) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-slate-400" />
                                Frequência
                            </label>
                        </div>
                        
                        <div className="relative">
                            <input 
                                type="text"
                                inputMode="decimal"
                                value={aluno.frequencia}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '' || /^\d*[.,]?\d*$/.test(val)) {
                                        const num = parseFloat(val.replace(',', '.'));
                                        if (val === '' || num <= 100) handleChange('frequencia', val);
                                    }
                                }}
                                placeholder="0"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-4 pr-10 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-bold placeholder:text-slate-300"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                        </div>
                        
                        {/* Barra de Progresso da Frequência */}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    (parseFloat(aluno.frequencia) || 0) < 75 ? 'bg-rose-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min(100, parseFloat(aluno.frequencia.replace(',', '.')) || 0)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Footer do Formulário: Dicas e Botão */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                    <div className="flex items-start gap-2 text-slate-500 text-sm">
                        <Info className="w-5 h-5 shrink-0 text-indigo-400" />
                        <p className="font-medium leading-relaxed">
                            A frequência mínima aprovativa é de <strong className="text-slate-700">75%</strong>. <br className="hidden sm:block" />
                            Valores fracionados podem ser separados por ponto ou vírgula.
                        </p>
                    </div>

                    <button 
                        type="submit" 
                        disabled={enviando || temErrosNotas()}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                            enviando || temErrosNotas() 
                                ? 'bg-slate-300 shadow-none cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'
                        }`}
                    >
                        {enviando ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Confirmar Matrícula
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioAluno;