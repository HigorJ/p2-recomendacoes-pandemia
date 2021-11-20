const mongoose = require('mongoose');

const recomendacaoSchema = mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recomendacao', recomendacaoSchema);