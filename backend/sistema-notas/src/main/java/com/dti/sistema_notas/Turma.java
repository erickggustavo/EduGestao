package com.dti.sistema_notas;

import java.util.ArrayList;

public class Turma {
    private ArrayList <Aluno> alunos = new ArrayList<>();

    
    public void adicionarAlunos(Aluno aluno){
        alunos.add(aluno);
        }
    public double calcularMediaTurmaGeral(){                            //Calculo da media geral da turma(todas as disciplinas juntas)
        double somaTotal = 0;
        int totalNotas = 0;

            for(Aluno aluno : alunos){                                  //loop for-each para percorrer a lista de alunos
                double[] notas = aluno.getNotasDoAluno();               //pega todas as notas do aluno
                for(double nota: notas){ 
                    somaTotal += nota;
                }
                totalNotas += notas.length;
            }
            //operador ternario para verificar se não há notas na lista (se verdadeiro retorna 0 caso contrario retorna a media normalmente)
            return totalNotas == 0 ? 0 : somaTotal / totalNotas;    
        }


    public ArrayList <Aluno> getAlunosAcimaDaMedia(){                   //calculo para saber quais alunos estão acima da media, utilizando o metodo anterior como base!!
        ArrayList <Aluno> acimaMedia = new ArrayList<>();               //array para armazenar os alunos que estão acima da media
        double mediaGeralDaTurma = calcularMediaTurmaGeral();           //chama o metodo calcMedia e armazena na variavel mediaGeralDaTurma.

        for(Aluno aluno : alunos){                                      //- Usa for-each para iterar sobre todos os alunos
            if(aluno.calcularMedia() > mediaGeralDaTurma){              //aplica o calculo para saber quais alunos estão acima da media
                acimaMedia.add(aluno);                                  //adiciona o nome do aluno ao array
                }
            }
        return acimaMedia; //retorna o array
        }

        public double[] calcularMediaPorDisciplina(){                   //metodo para calcular a media da turma por disciplina
            double[] medias = new double[5];                            //cria o vetor que vai armazenar as medias

            for(int disciplina = 0; disciplina < 5; disciplina++){      //percorre todas as 5 disciplinas
                double soma = 0;
                    for(Aluno aluno : alunos){                          //loop for-each para iterar sobre todos os alunos
                        double[] notas = aluno.getNotasDoAluno();       //para cada aluno vai pegar todas as suas notas
                        soma += notas[disciplina];                      //na array notas, vai pegar a nota especifica da disciplina e somar a variavel cumulativa "soma"
                    }
                    medias[disciplina] = alunos.isEmpty() ? 0 : soma / alunos.size();   //Atribui média da disciplina ao array medias
            }                                                                           //Implementa defensiva contra lista vazia com operador ternário (se lista vazia, media = 0)
            return medias;                                                              //retorna a media da turma em cada disciplina
        }
    public ArrayList<Aluno> getAlunosFrequenciaBaixa() {                                //metodo para ver quais alunos estão com baixa frequencia
    ArrayList<Aluno> frequenciaBaixa = new ArrayList<>();                               //cria array pra armazenar os alunos com baixa frequencia

    for (Aluno aluno : alunos) {                                                        //loop for-each para iterar sobre a array alunos
        if (aluno.temFrequenciaBaixa()) {                                               // Usa o método que já existe na classe Aluno, para ver quais estão com baixa frequencia
            frequenciaBaixa.add(aluno);                                                 //se a frequencia for baixa, adiciona ao array
            }
        }
    return frequenciaBaixa;                                                             //retorna os alunos com baixa frequencia
    }



    //metodo getter

    public ArrayList<Aluno> getListaAlunos(){
        return new ArrayList<>(alunos);                                                  //copia defensiva é retornada
    }
}

