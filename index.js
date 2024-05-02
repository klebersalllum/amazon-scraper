const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3000;

// Helper function to scrape Amazon
async function scrapeAmazon(keyword) {
  const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

  try {
    // Fetch HTML from Amazon
    const response = await axios.get(searchUrl);
    const html = response.data;

    // Parse HTML with JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract product information from the search results
    const products = [];
    const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

    productElements.forEach((productElement) => {
      const titleElement = productElement.querySelector('h2 a span');
      const ratingElement = productElement.querySelector('.a-icon-alt');
      const reviewsElement = productElement.querySelector('.a-size-base');
      const imageElement = productElement.querySelector('img');

      if (titleElement && ratingElement && reviewsElement && imageElement) {
        const title = titleElement.textContent.trim();
        const rating = ratingElement.textContent.trim();
        const reviews = reviewsElement.textContent.trim();
        const imageUrl = imageElement.src;

        products.push({
          title,
          rating,
          reviews,
          imageUrl,
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Error scraping Amazon:', error);
    throw new Error('Failed to scrape Amazon');
  }
}

// Endpoint for scraping Amazon
app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const products = await scrapeAmazon(keyword);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Amazon' });
  }
});
function scrapeAmazon() {
    const keyword = document.getElementById('keyword').value;
  
    if (!keyword) {
      alert('Please enter a search keyword');
      return;
    }
  
    // Clear previous results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    // AJAX call to backend endpoint
    fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`)
      .then((response) => response.json())
      .then((products) => {
        if (products.error) {
          resultsDiv.textContent = 'Error: ' + products.error;
        } else {
          // Display results on the page
          products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
  
            const image = document.createElement('img');
            image.src = product.imageUrl;
            productDiv.appendChild(image);
  
            const title = document.createElement('div');
            title.className = 'product-title';
            title.textContent = product.title;
            productDiv.appendChild(title);
  
            const rating = document.createElement('div');
            rating.className = 'product-rating';
            rating.textContent = 'Rating: ' + product.rating;
            productDiv.appendChild(rating);
  
            const reviews = document.createElement('div');
            reviews.className = 'product-reviews';
            reviews.textContent = 'Reviews: ' + product.reviews;
            productDiv.appendChild(reviews);
  
            resultsDiv.appendChild(productDiv);
          });
        }
      })
      .catch((error) => {
        resultsDiv.textContent = 'An error occurred while scraping';
        console.error('Error:', error);
      });
  }
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
