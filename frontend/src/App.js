import React from 'react';
import './estilo-final.css';
import './index.css';
import FormularioAluno from './components/formularioAluno';
import EstatisticasTurma from './components/EstatisticasTurma';
import { BookOpen, Bell } from 'lucide-react'; // Importando ícones para a Navbar

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar Moderna */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo / Nome do Sistema */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200">
                <BookOpen className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Edu<span className="text-indigo-600">Gestão</span>
              </h1>
            </div>

            {/* Área de Perfil do Usuário */}
            <div className="flex items-center gap-5">
              <button className="text-slate-400 hover:text-indigo-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>
              
              <div className="h-8 w-px bg-slate-200"></div> {/* Divisor vertical */}
              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                    Prof. Carlos
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Administrador
                  </p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
                  PC
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Conteúdo Principal (Container) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Seção do Formulário */}
        <section className="animate-slide-up">
          <FormularioAluno />
        </section>

        {/* Divisor Visual Elegante entre Formulário e Dashboard */}
        <div className="flex items-center gap-4 py-2 animate-slide-up delay-200">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-200 flex-1"></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-1 rounded-full border border-slate-100 shadow-sm">
            Painel de Análise
          </span>
          <div className="h-px bg-gradient-to-l from-transparent via-slate-200 to-slate-200 flex-1"></div>
        </div>

        {/* Seção de Estatísticas (Dashboard) */}
        <section className="animate-slide-up delay-300">
          <EstatisticasTurma />
        </section>

      </main>

    </div>
  );
}

export default App;