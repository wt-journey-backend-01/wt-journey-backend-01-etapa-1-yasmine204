const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.status(200);
});

app.get('/sugestao', (req, res) => {
    const nome = req.query.nome;
    const ingredientes = req.query.ingredientes;
    res.status(200).send(
        `<h1>Obrigado pelo sugestão, ${nome}!</h1>
        <p>Os ingredientes sugeridos foram ${ingredientes}.</p>`
    );

    res.status(200);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
    res.status(200);
});

app.post("/contato", (req, res) => {
    const {nome, email, assunto, mensagem} = req.body;
    const paginaContato = `
        <h1>Obrigado pela mensagem, ${nome}!</h1>
        <p>Email de contato: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Cardápio</a>
    `;
    res.status(200).send(paginaContato);
});

app.get('/api/lanches', (req, res) => {
    const lanches = [
        { id: 1, nome: "X-Burguer", ingredientes: "pão, hambúrguer, queijo, alface, molho" },
        { id: 2, nome: "Cachorro-quente", ingredientes: "pão, salsicha, ketchup, mostarda, batata palha" },
        { id: 3, nome: "Veggie Burger", ingredientes: "pão integral, hambúrguer vegetal, alface, tomate, maionese vegana" },
        { id: 4, nome: "Misto Quente", ingredientes: "pão, presunto, queijo, manteiga" },
    ];

    res.status(200).json(lanches);
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurguer rodando em localhost: ${PORT}`);
}); 