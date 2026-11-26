class Veiculo {
  #diaria

  constructor(marca, modelo, diaria) {
    this.marca = marca;
    this.modelo = modelo;
    this.#diaria = diaria;
  }
  getDiaria(){
    return this.#diaria;
  }
  descricao(){
    return alert(`Sua marca é ${this.marca} e possui ${this.modelo} com a diária de ${this.#diaria}`);
  }
  calcularAluguel(dias) {
    return this.#diaria * dias;
  }
}

class Carro extends Veiculo {
  constructor(marca, modelo, diaria, portas) {
    super(marca, modelo, diaria);
    this.portas = portas;
  }

  descricao() {
    return `${super.descricao()} | Portas: ${this.portas}`;
  }

  calcularAluguel(dias) {
    // Regra diferente do veículo comum: acréscimo de 15%
    return this.getDiaria() * dias * 1.15;
  }
}

class Moto extends Veiculo {
  constructor(marca, modelo, diaria, cilindradas) {
    super(marca, modelo, diaria);
    this.cilindradas = cilindradas;
  }

  descricao() {
    return `${super.descricao()} | Cilindradas: ${this.cilindradas}cc`;
  }

  calcularAluguel(dias) {
    // Regra diferente do veículo comum: desconto de 10%
    return this.getDiaria() * dias * 0.9;
  }
}

class Locadora {
  constructor() {
    this.veiculos = [];
  }

  adicionarVeiculo(veiculo) {
    this.veiculos.push(veiculo);
  }

  listarVeiculos() {
    this.veiculos.forEach((veiculo, indice) => {
      console.log(`${indice + 1}. ${veiculo.descricao()}`);
    });
  }

  calcularTotal(dias) {
    return this.veiculos.reduce((total, veiculo) => {
      return total + veiculo.calcularAluguel(dias);
    }, 0);
  }

  exibirResumoAluguel(dias = 3) {
  const qtdDias = Number(dias) > 0 ? Number(dias) : 3;

  console.log(`=== RESUMO DA LOCADORA (${qtdDias} DIAS) ===`);

  for (const veiculo of this.veiculos) {
    const valorBase = veiculo.getDiaria() * qtdDias;
    const valorFinal = veiculo.calcularAluguel(qtdDias);
    const diferenca = valorFinal - valorBase;

    let infoExtra = "Sem taxa adicional";
    if (diferenca > 0) {
      infoExtra = `Taxa/acréscimo: +R$ ${diferenca.toFixed(2)}`;
    } else if (diferenca < 0) {
      infoExtra = `Desconto: -R$ ${Math.abs(diferenca).toFixed(2)}`;
    }

    console.log(veiculo.descricao());
    console.log(`Base: R$ ${valorBase.toFixed(2)} | ${infoExtra} | Total: R$ ${valorFinal.toFixed(2)}`);
  }

  console.log(`Total geral (${qtdDias} dias): R$ ${this.calcularTotal(qtdDias).toFixed(2)}`);
}
}

const locadora = new Locadora();

const carro1 = new Carro("Toyota", "Corolla", 180, 4);
const moto1 = new Moto("Honda", "CB 500", 120, 500);

locadora.adicionarVeiculo(carro1);
locadora.adicionarVeiculo(moto1);

let diasLocacao = 3;
let entrada = prompt(
  "Escolha uma opção:\n1 - Listar veículos\n2 - Valor por 3 dias\n3 - Total da locadora\n4 - Exibir resumo"
);

let opcao = entrada ? entrada.trim() : "";

switch (opcao) {
  case "1":
    locadora.listarVeiculos();
    break;

  case "2":
    console.log(`Carro (${diasLocacao} dias): R$ ${carro1.calcularAluguel(diasLocacao).toFixed(2)}`);
    console.log(`Moto (${diasLocacao} dias): R$ ${moto1.calcularAluguel(diasLocacao).toFixed(2)}`);
    break;

  case "3":
    console.log(`Total (${diasLocacao} dias): R$ ${locadora.calcularTotal(diasLocacao).toFixed(2)}`);
    break;

  case "4":
    locadora.exibirResumoAluguel(diasLocacao);
    break;

  default:
    console.log("Opção inválida. Escolha entre 1 e 4.");
    break;
}