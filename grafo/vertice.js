class Elemento{
	constructor(valor, peso){
		this.valor = valor;
		this.peso = peso
	}

	getValor(){
		return this.valor;
	}

	getPeso(){
		return this.peso;
	}
}

class Vertice {
	constructor(){
		this.lista_adj = [];
	}

	getCompleteList(){
		return this.lista_adj;
	}

    getListaAdj() {
        return this.lista_adj.map((e)=>{
			return e.valor;
		});
    }
    
	getListaPeso() {
        return this.lista_adj.map((e)=>{
			return e.peso;
		});
    }

	getTamanhoLista(){
		return this.lista_adj.length;
	}

    addAresta(valor, peso) {
        this.lista_adj.push(new Elemento(valor, peso));
    }

    getTamanhoLista(){
        return this.lista_adj.length;
    }
}

module.exports = Vertice;