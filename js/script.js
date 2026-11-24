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
  calcularaluguel(dias) {
    return this.#diaria * dias;
  }
}
