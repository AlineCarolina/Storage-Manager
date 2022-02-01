require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsControllers = require('./controllers/productsControllers');
const { verifyName, verifyQuantity } = require('./controllers/validations');

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.post('/products', verifyName, verifyQuantity, productsControllers.create);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', verifyName, verifyQuantity, productsControllers.productUpdate);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
