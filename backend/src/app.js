import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {id: 1, "titulo": "Senhor dos Anéis"},
    {id: 2, "titulo": "O Hobbit"}
];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso');
});

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id);
}

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);

    if(index>0) {
        livros[index].titulo = req.body.titulo;
        res.json(livros);
    }else{
        res.status(404);
        res.json({erro:"Registro não encontrado!"})
    }
});

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    if(index>0) {
        res.json(livros[index]);
    }else{
        res.status(404);
        res.json({erro:"Registro não encontrado!"})
    }
});

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    if(index>0) {
        livros.splice(index, 1);
        res.send(`Livro ${id} removido com sucesso`);
    }else{
        res.status(404);
        res.json({erro:"Registro não encontrado!"})
    }
});

export default app;