package com.dti.sistema_notas;
    
public class Aluno {
    private String nomeAluno;
    private double[] notas;
    private double frequencia;

    public Aluno(String nomeAluno, double notas[], double frequencia){
        this.nomeAluno = nomeAluno;
        this.frequencia = frequencia;
        if(notas.length != 5){                                                                  //valida o tamanho do array para que tenha examente as 5 notas;
            throw new IllegalArgumentException("Insira exatamente 5 notas, por favor!!!");   //exceção caso o N de notas seja diferente de 5;
        }
        this.notas = notas.clone();                                                             //copia defensiva, pra evitar que as notas do aluno possam ser alteradas externamente

        for(int i = 0; i < notas.length; i++){                                                  //verificar se as notas inseridas batem com o permitido (0 a 10)
            if(notas[i] > 10 || notas[i] < 0){
                throw new IllegalArgumentException("Uma das notas inseridas é invalida..."); //exceção caso uma das notas seja invalida;
        }
    }
        if(frequencia < 0 || frequencia > 100){                                                //valida se frequencia bate com o permitido (0% e 100%)
        throw new IllegalArgumentException("A frequência inserida não é valida");           //exceção caso a frequencia seja invalida
        }
    } 

    //metodos getters

    public String getNomeAluno(){                                                             //retorna o nome do aluno;
        return nomeAluno;
    }
    
    public double getFrequencia(){                                                            //retorna a frequencia do aluno
        return frequencia;
    }
    public double[] getNotasDoAluno(){                                                        //retorna as notas do aluno em cada materia
        return notas.clone();
    }
    public double getNotaDaDisciplina(int disciplina){                                        //retorna a nota de cada disciplina
        return notas[disciplina];
    }
    //funções
    public double calcularMedia(){                                                            //calcula e retorna a media do aluno
        double soma = 0;
        for(int i = 0; i < notas.length; i++){
            soma += notas[i];
        }
        return soma / notas.length;
    }

    public boolean temFrequenciaBaixa(){                                                      //retorna true se a frequencia do aluno for menor q 75%
        boolean frequenciaBaixa = false;                                                      //metodo pode ser reaproveitado na classe turma!!!
        if(frequencia < 75){
            frequenciaBaixa = true;
        }
        return frequenciaBaixa;
    }

}

