class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
  apresentar() {
    return alert(`Olá eu sou ${this.nome} e tenho ${this.idade} anos`);
  }
}

class Aluno extends Pessoa {
  #notas;
  constructor(nome, idade, matricula) {
    super(nome, idade);
    this.matricula = matricula;
    this.#notas = [];
  }

  adicionarNota(nota) {
    if (nota < 0 || nota > 10 || isNaN(nota)) {
      alert('Nota digitada é invalida');
      return;
    }
    this.#notas.push(nota);
    alert('Nota cadastrada com sucesso!');
  }

  calcularMedia() {
    if (this.#notas.length === 0) {
      return 0;
    }

    let soma = 0;

    for (let contadora = 0; contadora < this.#notas.length; contadora++) {
      soma += this.#notas[contadora];
    }

    return soma / this.#notas.length;
  }

  verificarSituacao() {
    const media = this.calcularMedia();

    if (media >= 7) {
      return alert('Aprovado');
    } else if (media > 5) {
      return alert('Recuperação');
    } else {
      return alert('Reprovado');
    }
  }

  apresentar() {
    return `${super.apresentar()}`;
  }
}

class Professor extends Pessoa {
  constructor(nome, idade, disciplina) {
    super(nome, idade);
    this.disciplina = disciplina;
  }

  apresentar() {
    return alert(
      `Olá eu sou professor ${this.nome}! \n Disciplina: ${this.disciplina}`,
    );
  }
}

const pessoas = [];

function cadastrarAluno() {
  const nome = prompt('Digite o nome do Aluno');
  const idade = Number(prompt('Digite a idade do Aluno'));
  const matricula = prompt('Digite o numero de matricula');

  if (!nome || !matricula || !Number.isFinite(idade) || idade <= 0) {
    alert('Dados Invalidos!');
    return;
  }

  const aluno = new Aluno(nome, idade, matricula);
  pessoas.push(aluno);

  alert('Aluno cadastrado com sucesso!');
}

function cadastrarProfessor() {
  const nome = prompt('Digite o nome do Professor');
  const idade = Number(prompt('Digite a idade do Professor'));
  const disciplina = prompt('Digite a disciplina');

  if (!nome || !disciplina || !Number.isFinite(idade) || idade <= 0) {
    alert('Dados Invalidos!');
    return;
  }

  const professor = new Professor(nome, idade, disciplina);
  pessoas.push(professor);

  alert('Professor cadastrado com sucesso!');
}

function listarPessoas() {
  if (pessoas.length === 0) {
    alert('Nenhuma pessoa cadastrada');
    return;
  }

  for (let contadora = 0; contadora < pessoas.length; contadora++) {
    console.log(pessoas[contadora].apresentar());
  }
}

function adicionarNotaAluno() {
  const matricula = prompt('Digite a matricula');

  const aluno = pessoas.find((pessoa) => {
   return pessoa instanceof Aluno && pessoa.matricula === matricula;
  });

  if (!aluno) {
    alert('Aluno não encontrado');
    return;
  }

  const nota = Number(prompt('Digite a nota do aluno'));
  aluno.adicionarNota(nota);
}

function consultarMedia() {
  const matricula = prompt('Digite a matricula');

  const aluno = pessoas.find((pessoa) => {
   return pessoa instanceof Aluno && pessoa.matricula === matricula;
  });

  if (!aluno) {
    alert('Aluno não encontrado');
    return;
  }

  alert(
    `Media: ${aluno.calcularMedia().toFixed(2)}
    Situação: ${aluno.verificarSituacao()}`,
  );
}

let opcao;

do {
  opcao = prompt(`Escola - Menu Principal
    
    1 - cadastrar aluno
    2 - cadastrar professor
    3 - adicionar nota
    4 - listar pessoas
    5 - consultar media 
    0 - sair`);

  switch (opcao) {
    case '1':
      cadastrarAluno();
      break;

    case '2':
      cadastrarProfessor();
      break;

    case '3':
      adicionarNotaAluno();
      break;

    case '4':
      listarPessoas();
      break;

    case '5':
      consultarMedia();
      break;

    case '0':
      alert('Encerrando Sistema...');
      break;

    default:
      alert('opção invalida');
  }
} while (opcao !== "0")