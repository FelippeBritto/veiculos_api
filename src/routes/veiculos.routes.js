const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Veiculo = require('../models/veiculos.model');

// !A API do projeto deve possuir os seguintes endpoints:

///// * Cadastrar Veículo
///// * Listar Veículos(com filtros para marca e cor do veículo)
///// * Consultar Veículo pela placa
///// * Editar Veículo pela placa
///// * Deletar Veículo pela placa

// !Adicionar Revisão pela placa

// !Consultar Total de gasto em revisões do veículo pela placa
// !Consultar Total de gasto em revisões do veículo pela marca


// * Cadastrar novo Veículo
router.post('/cadastrar-veiculo', (req, res, next) => {
   const veiculo = new Veiculo({
      _id: new mongoose.Types.ObjectId(),
      PLACA: req.body.placa,
      MARCA: req.body.marca,
      MODELO: req.body.modelo,
      COR: req.body.cor,
      ANO_FABRICACAO: req.body.anoFabricacao,
      DATA_CADASTRO: req.body.dataCadastro,
      REVISOES: {
         DATA_REVISAO: req.body.dataRevisao,
         VALOR: req.body.valor,
      }
   });
   veiculo.save()
      .then(result => {
         res.status(201).json({
            message: 'Vehicle has been created!',
            veiculoCadastrado: veiculo
         });
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//* Consultar veículo pela placa
router.get('/consulta-veiculo/:placaVeiculo', (req, res, next) => {
   const placa = req.params.placaVeiculo;
   Veiculo.findOne({ PLACA: placa })
      .exec()
      .then(doc => {
         res.status(200).json(doc);
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//* Consultar veículo por marca e cor
//! DÚVIDA SOBRE FILTRAR MARCA E COR / MARCA OU COR
router.get('/consulta-veiculo/:marca/:cor', (req, res, next) => {
   const marca = req.params.marca;
   const cor = req.params.cor;

   Veiculo.find({
      MARCA: marca,
      COR: cor
   })
      .exec()
      .then(doc => {
         res.status(200).json(doc);
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

// * Update por placa
router.put('/atualizar-veiculo/:placaVeiculo', (req, res, next) => {
   const placa = req.params.placaVeiculo;
   Veiculo.findOneAndUpdate(placa, {
      $set: {
         PLACA: req.body.placa,
         MARCA: req.body.marca,
         MODELO: req.body.modelo,
         COR: req.body.cor,
         ANO_FABRICACAO: req.body.anoFabricacao,
         DATA_CADASTRO: req.body.dataCadastro,
         REVISOES: {
            DATA_REVISAO: req.body.dataRevisao,
            VALOR: req.body.valor,
         }
      }
   })
      .then(result => {
         res.status(201).json({
            message: "Veículo atualizado!"
         });
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//* Deletar veículo pela placa
router.delete('/deletar-veiculo/:placaVeiculo', (req, res, next) => {
   const placa = req.params.placaVeiculo;
   Veiculo.findOneAndDelete({ PLACA: placa })
      .exec()
      .then(result => {
         res.status(200).json({
            message: 'Veículo deletado!'
         })
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});
module.exports = router;