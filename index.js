require("dotenv").config();
const express = require("express");
const massive = require("massive");
const productsCtrl = require("./products_controller")

const app = express();

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set("db", dbInstance);
})
.catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', productsCtrl.create);
app.get('/api/products', productsCtrl.getAll);
app.get('/api/products/:id', productsCtrl.getOne);
app.put('/api/products/:id', productsCtrl.update);
app.delete('/api/products/:id', productsCtrl.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`)
});