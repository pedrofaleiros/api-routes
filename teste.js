const Grafo = require('./grafo/grafo.js');

const g = new Grafo(7);

g.addAresta(0, 1, 19);
g.addAresta(0, 2, 28);
g.addAresta(0, 3, 27);
g.addAresta(0, 4, 13);
g.addAresta(1, 2, 17);
g.addAresta(1, 3, 29);
g.addAresta(1, 4, 28);
g.addAresta(2, 3, 18);
g.addAresta(2, 4, 30);
g.addAresta(3, 4, 20);
g.addAresta(0, 5, 33);
g.addAresta(1, 5, 43);
g.addAresta(2, 5, 36);
g.addAresta(3, 5, 19);
g.addAresta(4, 5, 20);
g.addAresta(0, 6, 40);
g.addAresta(1, 6, 21);
g.addAresta(2, 6, 22);
g.addAresta(3, 6, 40);
g.addAresta(4, 6, 48);
g.addAresta(5, 6, 58);

console.log(g.caixeiro(0));
