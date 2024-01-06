const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/supermarket', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schemas
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const workerSchema = new mongoose.Schema({
  name: String,
  role: String,
});

// Create MongoDB models
const Product = mongoose.model('Product', productSchema);
const Worker = mongoose.model('Worker', workerSchema);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to add a product
app.post('/add-product', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to get all products
app.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to add a worker
app.post('/add-worker', async (req, res) => {
  try {
    const { name, role } = req.body;
    const newWorker = new Worker({ name, role });
    await newWorker.save();
    res.status(201).send('Worker added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to get all workers
app.get('/get-workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
