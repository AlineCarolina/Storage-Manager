require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.post('/products', productsControllers.create);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', productsControllers.productUpdate);

app.delete('/products/:id', productsControllers.deleteProducts);

app.post('/sales', salesControllers.create);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.getById);

app.put('/sales/:id', salesControllers.saleUpdate);

app.delete('/sales/:id', salesControllers.saleDelete);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
