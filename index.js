require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
const { verifyName, verifyQuantity, verifySales } = require('./controllers/validations');
const salesControllers = require('./controllers/salesControllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.post('/products', verifyName, verifyQuantity, productsControllers.create);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', verifyName, verifyQuantity, productsControllers.productUpdate);

app.delete('/products/:id', productsControllers.deleteProducts);

app.post('/sales', verifySales, salesControllers.create);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.getById);

app.put('/sales/:id', verifySales, salesControllers.saleUpdate);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
