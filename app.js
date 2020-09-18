const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uri = 'mongodb+srv://maqplan_db:PLvaoiGltfxnhNLl@cluster0.yeu0q.mongodb.net/veiculos?retryWrites=true&w=majority';

const veiculoRoutes = require('./src/routes/veiculos.routes');

mongoose.connect(
   uri,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
   }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   if (req.method == "OPTIONS") {
      req.header("Access-Controll-Allow-Methods", "PUT, POST, PATH, GET, DELETE")
      return res.status(200).json({});
   };
   next();
});

app.use('/veiculos', veiculoRoutes)

app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;

   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message
      }
   });
});

module.exports = app;