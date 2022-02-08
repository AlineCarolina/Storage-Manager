require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');
const errorHandler = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.use('/', errorHandler);

app.use('/sales', saleRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
