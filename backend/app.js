require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Recomendacao = require('./models/recomendacao');

const {
    MONGODB_USER, 
    MONGODB_PASSWORD, 
    MONGODB_ADDRESS, 
    MONGODB_DATABASE
} = process.env;

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.${MONGODB_ADDRESS}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => console.log("Conexão OK"))
    .catch((e) => console.log ("Conexão NOK: " + e));

app.use(express.json());
app.use(cors());

app.get('/api/recomendacoes', (req, res) => {
    Recomendacao.find().sort({ data: "desc" })
        .then((recomendacoes) => {
            res.status(200).json({
                recomendacoes: recomendacoes
            });
        })
});

app.get('/api/recomendacoes/:id', (req, res) => {
    Recomendacao.findById(req.params.id)
        .then(recomendacao => {
            if (recomendacao) {
                res.status(200).json(recomendacao)
            } else {
                res.status(404).send({mensagem: "Recomendação não encontrado!"})
            }
        });
});

app.post('/api/recomendacoes', (req, res) => {
    const recomendacao = new Recomendacao({
        texto: req.body.texto,
    });
    
    recomendacao.save()
        .then((recomendacaoInserida) => {
            res.status(200).json({ mensagem: "Recomendação inserida!", id: recomendacaoInserida._id });
        });
});

app.put('/api/recomendacoes/:id', (req, res) => {
    const recomendacao = new Recomendacao({
        _id: req.params.id,
        texto: req.body.texto,
        data: req.body.data
    });

    Recomendacao.updateOne(
        {
            _id: req.params.id
        },
        recomendacao
    ).then((resultado) => {
        res.status(200).json({ mensagem: "Recomendação atualizada com sucesso!" });
    });
});

app.delete('/api/recomendacoes/:id', (req, res) => {
    Recomendacao.deleteOne({
        _id: req.params.id
    })
    .then((result) => {
        res.status(200).json({mensagem: 'Recomendação removida'})
    })
})

module.exports = app;