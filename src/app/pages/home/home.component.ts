import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  numeros: number[][] = [];
  jogos: number[][] = [];

  jogo: number[] = [];
  jogoBruto: string = '';
  erro: string[] = [];

  variosJogosBruto: string = '';
  jogosEmAnalise: number[][] = [];

  resultadoBruto: string = '';
  resultado: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.gerarNumeros();
  }

  trocarNumero(numero: number) {
    if(this.resultado.includes(numero)){
      this.resultado = this.resultado.filter(n => n !== numero);
    }else{
      this.resultado.push(numero);
    }
  }


  gerarNumeros() {
    const totalNumeros = 60;
    const porLinha = 10;

    for (let i = 1; i <= totalNumeros; i += porLinha) {
      const row = Array.from({ length: porLinha }, (_, index) => i + index).filter(num => num <= totalNumeros);
      this.numeros.push(row);
    }
  }

  adicionarJogo() {
    this.erro = [];
    this.formataJogo();
    this.filtrarJogo(this.jogo);
  }

  adicionarVariosJogos() {
    this.erro = [];
    this.formataVariosJogos();
  }

  formataVariosJogos() {
    this.jogosEmAnalise = this.variosJogosBruto.split('],').map(jogo => jogo.replace('[', '').replace(']', '').split(',').map(numero => parseInt(numero)));
    console.log(this.jogosEmAnalise);
    console.log(this.erro);
    this.jogosEmAnalise.forEach(jogo => {
      jogo.sort((a, b) => a - b);
      this.filtrarJogo(jogo);
    });
    if (this.erro.length === 0) {
      this.variosJogosBruto = '';
    }
  }

  formataJogo() {
    this.jogo = this.jogoBruto.split(',').map(numero => parseInt(numero));
    this.jogoBruto = '';

    this.jogo.sort((a, b) => a - b);
  }

  filtrarJogo(jogo: number[]) {
    console.log(jogo);

    if (jogo.length !== 6) {
      this.erro.push('O jogo deve conter 6 números: (' + jogo + ')');
      return;
    }

    let numerosRepetidos = jogo.filter((numero, index) => jogo.indexOf(numero) !== index);
    if (numerosRepetidos.length > 0) {
      this.erro.push('Os números não podem ser repetidos: (' + jogo + ')');
      return;
    }

    // Verificar se o jogo já existe
    let jogoExiste = this.jogos.filter(j => j.toString() === jogo.toString());
    if (jogoExiste.length > 0) {
      this.erro.push('Este jogo já foi adicionado: (' + jogo + ')');
      return;
    }

    // Verificar se os números estão no intervalo permitido
    let numerosInvalidos = jogo.filter(numero => numero < 1 || numero > 60);
    if (numerosInvalidos.length > 0) {
      this.erro.push('Os números devem ser entre 1 e 60: (' + jogo + ')');
      return;
    }

    // Se todas as validações passarem, adicionar o jogo
    this.jogos.push(jogo);
  }

  removerJogo(jogo: number[]) {
    this.jogos = this.jogos.filter(j => j !== jogo);
  }
}
