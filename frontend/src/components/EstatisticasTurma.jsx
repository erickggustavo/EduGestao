import React, { useState, useEffect, useMemo } from 'react';
import './EstatisticasTurma.css';
import { 
  Users, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Star, 
  RefreshCw,
  ChevronUp,
  ChevronDown,
  GraduationCap,
  UserCheck
} from 'lucide-react';

// --- Subcomponentes para manter o código limpo (DRY) ---

const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, bgColorClass, delayClass }) => (
  <div className={`bg-white rounded-3xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100/60 flex flex-col justify-between animate-slide-up card-hover-float ${delayClass}`}>
    
    <div className="flex items-center justify-between mb-4">
      <div className={`${bgColorClass} p-3 rounded-2xl`}>
        <Icon className={`w-6 h-6 ${colorClass}`} strokeWidth={2} />
      </div>
      <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">{title}</span>
    </div>
    
    <div>
      <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-1">{value}</h3>
      <p className="text-sm font-medium text-slate-500">{subtitle}</p>
    </div>
    
  </div>
);

function EstatisticasTurma() {
  const [estatisticas, setEstatisticas] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [alunosExpandidos, setAlunosExpandidos] = useState(false);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const [responseStats, responseAlunos] = await Promise.all([
        fetch('http://localhost:8080/api/alunos/estatisticas'),
        fetch('http://localhost:8080/api/alunos')
      ]);

      if (!responseStats.ok || !responseAlunos.ok) {
        throw new Error('Falha na comunicação com o servidor');
      }
      
      const stats = await responseStats.json();
      const alunosData = await responseAlunos.json();
      
      setEstatisticas(stats);
      setAlunos(alunosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Não foi possível carregar os dados da turma no momento.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // useMemo evita que as médias e listas sejam recalculadas a cada render
  const { alunosProcessados, destaques, alertas } = useMemo(() => {
    if (!alunos.length || !estatisticas) return { alunosProcessados: [], destaques: [], alertas: [] };

    const processados = alunos.map(aluno => {
      const media = aluno.notasDoAluno.length 
        ? aluno.notasDoAluno.reduce((a, b) => a + b, 0) / aluno.notasDoAluno.length 
        : 0;
      return {
        ...aluno,
        mediaCalculada: media,
        isDestaque: media > estatisticas.mediaGeralTurma,
        isAlerta: aluno.frequencia < 75
      };
    }).sort((a, b) => b.mediaCalculada - a.mediaCalculada); // Ordena por maior média

    return {
      alunosProcessados: processados,
      destaques: processados.filter(a => a.isDestaque),
      alertas: processados.filter(a => a.isAlerta)
    };
  }, [alunos, estatisticas]);

  // --- Estados de Carregamento e Erro ---
  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-slate-500 font-medium animate-pulse">Sincronizando base de dados...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 max-w-md text-center">
          <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Ops! Algo deu errado.</h2>
          <p className="text-slate-500 mb-6">{erro}</p>
          <button 
            onClick={carregarDados}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-xl transition-colors w-full"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // --- Renderização Principal ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
              <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-indigo-200">
                <GraduationCap className="w-6 h-6" strokeWidth={2.5} />
              </div>
              Dashboard da Turma
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-14">Visão geral do desempenho acadêmico e métricas</p>
          </div>
          
          <button 
            onClick={carregarDados} 
            className="group flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all border border-slate-200 shadow-sm hover:shadow active:scale-95"
          >
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:rotate-180 transition-all duration-500" />
            Sincronizar
          </button>
        </header>

        {/* Cards Principais */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total" 
            value={estatisticas.totalAlunos} 
            subtitle="Alunos matriculados"
            icon={Users} colorClass="text-blue-600" bgColorClass="bg-blue-50"
          />
          <StatCard 
            title="Média" 
            value={estatisticas.mediaGeralTurma?.toFixed(1)} 
            subtitle="Geral da turma"
            icon={Target} colorClass="text-emerald-600" bgColorClass="bg-emerald-50"
          />
          <StatCard 
            title="Destaque" 
            value={destaques.length} 
            subtitle="Acima da média"
            icon={TrendingUp} colorClass="text-indigo-600" bgColorClass="bg-indigo-50"
          />
          
          <StatCard 
            title="Alerta" 
            value={alertas.length} 
            subtitle="Frequência < 75%"
            icon={AlertTriangle} colorClass="text-rose-600" bgColorClass="bg-rose-50"
          />
        </section>

        {/* Grid Inferior */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Médias por Disciplina */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100/60 p-7 h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <BookOpen className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Médias por Disciplina</h3>
            </div>
            
            <div className="space-y-6">
              {estatisticas.mediasPorDisciplina?.map((media, index) => (
                <div key={index} className="group">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                      Disciplina {index + 1}
                    </span>
                    <span className="text-base font-extrabold text-slate-800">
                      {media?.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${(media / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Alunos */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100/60 p-7">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <UserCheck className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Desempenho dos Alunos</h3>
              </div>
              <button 
                onClick={() => setAlunosExpandidos(!alunosExpandidos)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-bold bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
              >
                {alunosExpandidos ? 'Ver Menos' : 'Ver Todos'}
              </button>
            </div>

            <div className="space-y-1">
              {alunosProcessados.slice(0, alunosExpandidos ? alunosProcessados.length : 5).map((aluno, index) => (
                <div 
                  key={index} 
                  className={`
                    flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl transition-colors duration-200 gap-4 sm:gap-0
                    ${aluno.isAlerta ? 'bg-rose-50/50 hover:bg-rose-50 border border-rose-100/50' : 'hover:bg-slate-50 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm
                      ${aluno.isDestaque ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-slate-600 border border-slate-200'}
                    `}>
                      {aluno.nomeAluno.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{aluno.nomeAluno}</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        Notas: {aluno.notasDoAluno.join(' • ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 sm:justify-end ml-14 sm:ml-0">
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-extrabold text-slate-700">
                        Média {aluno.mediaCalculada.toFixed(1)}
                      </p>
                      <p className={`text-xs font-bold mt-0.5 ${aluno.isAlerta ? 'text-rose-600' : 'text-slate-400'}`}>
                        Freq. {aluno.frequencia}%
                      </p>
                    </div>
                    
                    <div className="flex gap-2 w-12 justify-end">
                      {aluno.isDestaque && (
                        <span className="bg-amber-100 p-1.5 rounded-md text-amber-600" title="Acima da média">
                          <Star className="w-4 h-4 fill-current" />
                        </span>
                      )}
                      {aluno.isAlerta && (
                        <span className="bg-rose-100 p-1.5 rounded-md text-rose-600" title="Frequência baixa">
                          <AlertTriangle className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Insights (Footer) */}
        {(destaques.length > 0 || alertas.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {destaques.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-5 h-5 text-indigo-500 fill-current" />
                  <h3 className="text-lg font-bold text-slate-800">Destaques</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destaques.map((aluno, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-semibold">
                      <ChevronUp className="w-4 h-4 text-emerald-500" />
                      {aluno.nomeAluno}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {alertas.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-bold text-slate-800">Atenção Necessária</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {alertas.map((aluno, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1.5 rounded-lg text-sm font-semibold">
                      <ChevronDown className="w-4 h-4 text-rose-500" />
                      {aluno.nomeAluno} ({aluno.frequencia}%)
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default EstatisticasTurma;