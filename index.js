const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.port || 5000;

const apiKey = '8c8723fc5e308c87714c04e501e24295'
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Amazon Scraper API')
})

// GET Product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`)

    res.json(JSON.parse(response));
  } catch(err) {
    console.log(err.message);
    res.status(500).send(err)
  }
})

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`)

    res.json(JSON.parse(response));
  } catch(err) {
    console.log(err.message);
    res.status(500).send(err)
  }
})

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`)

    res.json(JSON.parse(response));
  } catch(err) {
    console.log(err.message);
    res.status(500).send(err)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));