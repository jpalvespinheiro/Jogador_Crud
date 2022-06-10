export type TJogador = {
  id: number,
  nome: string;
  apelido: string;
  posicao: string;
  cpf: string;
  camisa: number;
  idade: number;
  salario: number;
};

export type JogadorDTO = Omit<TJogador, 'id'>;

