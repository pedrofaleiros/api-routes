const Vertice = require("./vertice.js");

class Grafo {

	constructor(num_vertices){
		this.vertices = [];
		this.num_vertices = num_vertices;
		this.rota_otima = [];
		this.menor_distancia = Number.MAX_SAFE_INTEGER;

		for(let i = 0; i < num_vertices; i++){
			this.vertices.push(new Vertice());
		}
	}

	addAresta(x, y, peso){
		this.vertices[x].addAresta(y, peso);

		this.vertices[y].addAresta(x, peso);
	}

	mostraGrafo() {
        for (let i = 0; i < this.num_vertices; i++) {
            console.log(`${i} -> ${this.vertices[i].getListaAdj()}`);
        }
    }
    
	getDistancia(x, y){
		let tam = this.vertices[x].getTamanhoLista();
		for(let i = 0; i < tam; i++){
			let elemento = this.vertices[x].getListaAdj()[i];

			if(elemento == y){
				return this.vertices[x].getListaPeso()[i];
			}
		}

	}

	calcula_route_distancia(route){
		let distancia = 0;
		let tam = route.length;

		for(let i = 0, j = 1; i < tam-1 && j < tam; i++, j++){
			distancia += this.getDistance(route[i], route[j]);
		}
		return distancia;
	}

	melhor_rota(origin){

		if(this.num_vertices < 4) return false;

		this.rota_otima = [...Array(this.num_vertices+1).fill(0)];
		this.menor_distancia = Number.MAX_SAFE_INTEGER;

		let indice = 0;
		const route = [...Array(this.num_vertices+1).fill(0)];
		const visitados = [...Array(this.num_vertices).fill(0)];
		
		visitados[origin] = 1;
		route[0] = origin;
		route[this.num_vertices] = origin;

		let tam = this.vertices[origin].getTamanhoLista();
		for(let i = 0; i < tam-1; i++){
			let elemento = this.vertices[origin].getListaAdj()[i]
			let distancia = this.vertices[origin].getListaPeso()[i]

			this.recursiva(origin, visitados, route, indice+1, elemento, distancia);
		}

		return {
			'rota':this.rota_otima,
			'peso':this.menor_distancia
		}
	}

	recursiva(origin, visitados, route, indice, elemento, distancia){

		if(distancia >= this.menor_distancia) return;

		route[indice] = elemento;
		
		if(indice == this.num_vertices-1){
			let dist = distancia + this.getDistancia(origin, elemento);

			if(dist < this.menor_distancia){
				this.menor_distancia = dist;
				this.rota_otima = [...route]
			}
			return;
		}
		visitados[elemento] = 1;

		let tam = this.vertices[elemento].getTamanhoLista();
		for(let i = 0; i < tam; i++){
			if(visitados[this.vertices[elemento].getListaAdj()[i]] == 0){
				this.recursiva(origin, visitados, route, indice+1, this.vertices[elemento].getListaAdj()[i], distancia+this.vertices[elemento].getListaPeso()[i]);
			}
		}
		visitados[elemento] = 0;
	}
}

module.exports = Grafo;