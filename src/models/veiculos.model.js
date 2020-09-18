const mongoose = require('mongoose');

const veiculoSchema = mongoose.Schema(
   {
      _id: mongoose.Schema.Types.ObjectId,
      PLACA: {
         type: String
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
      REVISOES: {
         DATA_REVISAO: {
            type: String
         },
         VALOR: {
            type: Number
         },
      }
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('Veiculo', veiculoSchema);