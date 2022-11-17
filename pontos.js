const Grafo = require("./grafo/grafo");

function dist_pontos(p1, p2) {
    distancia = Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y-p1.y), 2);
    return Math.sqrt(distancia);
}

class Ponto {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const pontos = [
    [1.0, 1.0],
    [2.0, 4.0],
    [3.0, 3.0],
    [5.0, 4.0],
    [3.0, 2.0],
    [5.0, 1.0],
    [7.0, 3.0],
    [4.0, 3.0],
    [4.0, 4.0],
    [1.0, 3.0],
    [6.0, 4.0],
    [7.0, 1.0]
]

const grafo = new Grafo(pontos.length);

for(let i = 0; i < pontos.length-1; i++){
    p1 = new Ponto(pontos[i][0], pontos[i][1]);
    for(let j = i+1; j < pontos.length; j++){
        p2 = new Ponto(pontos[j][0], pontos[j][1]);
        dist = dist_pontos(p1, p2);
        grafo.addAresta(i, j, dist);
    }
}

console.time('tempo')
const res = grafo.tsp(0);
console.timeEnd('tempo')

console.log('Numero de vertices:', grafo.num_vertices)
console.log(res);
