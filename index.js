const express = require('express');
const app = express();
const cors = require('cors');
const Grafo = require('./grafo/grafo.js');
const Ponto = require('./grafo/ponto.js');

function dist_pontos(p1, p2) {
    distancia = Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y-p1.y), 2);
    return Math.sqrt(distancia);
}

const port = Process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ "status": "OK" });
});

app.post('/get-route', (req, res) => {

    if (req.body.vertices && req.body.arestas) {
        const numv = req.body.vertices;
        const arestas = req.body.arestas;

        if (numv > 11) return res.json({ "status": "Erro" });

        const g = new Grafo(numv);

        for (let i = 0; i < arestas.length; i++) {
            let x = arestas[i][0];
            let y = arestas[i][1];
            let peso = parseFloat(arestas[i][2]);

            g.addAresta(x, y, peso);
        }

        const result = g.tsp(0);

        const route = result.rota;
        const peso = result.peso;

        return res.json({ 'rota': route, 'distancia': peso });
    } else {
        return res.json({ "status": "Erro" });
    }
});

app.post('/get-route-pts', (req, res) => {

    if (req.body.pontos) {
        const pts = req.body.pontos;

        const grafo = new Grafo(pts.length);

        const pontos = pts.map((p, i)=>{
            return {'i':i, 'ponto':p}
        });

        for (let i = 0; i < pts.length - 1; i++) {
            p1 = new Ponto(pts[i][0], pts[i][1]);
            for (let j = i + 1; j < pts.length; j++) {
                p2 = new Ponto(pts[j][0], pts[j][1]);
                dist = dist_pontos(p1, p2);
                grafo.addAresta(i, j, dist);
            }
        }

        const result = grafo.tsp(0);

        const route = result.rota;
        const peso = result.peso;

        return res.json({ 'rota': route, 'distancia': peso , 'pontos':pontos});
    } else {
        return res.json({ "status": "Erro" });
    }

});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

/* 
exemplo:
{
  "vertices":5,
  "arestas":[
    [0, 1, 19],
    [0, 2, 28],
    [0, 3, 27],
    [0, 4, 13],
    [1, 2, 17],
    [1, 3, 29],
    [1, 4, 28],
    [2, 3, 18],
    [2, 4, 30],
    [3, 4, 20]
    ]
}
*/