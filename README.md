# Amazon Product Scraper

## Description
This project is a simple web scraper that extracts product information from the first page of Amazon search results based on a given keyword. It consists of a Node.js backend with Express.js and a frontend with HTML, CSS, and JavaScript.

**Note:** Scraping Amazon is against their terms of service. This project is for educational purposes only. Use with caution.

## Prerequisites
- Node.js
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd amazon-scraper
2. Start the Node.js server:
    ```bash
    node index.js
3. Open a web browser and navigate to:
    ```bash
    http://localhost:3000
4. Enter a search keyword and click the "Scrape" button to initiate the scraping process.

## Error Handling
1. If an error occurs during scraping, a message will be displayed on the frontend. Check the backend logs for additional information.


### Testing and Troubleshooting

Ensure the following when testing the project:
- Proper error handling and graceful degradation.
- Properly styled frontend with clear output.
- Backend endpoint works and provides the expected output.
- Frontend retrieves data and displays it correctly.

### Final Thoughts

This solution provides a full-stack implementation with Node.js, Express.js, axios, and JSDOM for the backend and HTML, CSS, and Vanilla JavaScript for the frontend. Remember that scraping is a sensitive topic, especially with platforms like Amazon, so use this solution with caution and in compliance with applicable terms and conditions.
