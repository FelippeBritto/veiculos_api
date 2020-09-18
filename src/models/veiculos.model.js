const mongoose = require('mongoose');

const revisoesSchema = mongoose.Schema({
   DATA_REVISAO: {
      type: String,
   },
   VALOR: {
      type: Number
   },
});

const veiculoSchema = mongoose.Schema(
   {
      _id: mongoose.Schema.Types.ObjectId,
      PLACA: {
         type: String,
         required: true,
         unique: true
      },
      MARCA: {
         type: String,
      },
      MODELO: {
         type: String
      },
      COR: {
         type: String
      },
      ANO_FABRICACAO: {
         type: Number
      },
      DATA_CADASTRO: {
         type: String
      },
      REVISOES: [revisoesSchema]
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('Veiculo', veiculoSchema);