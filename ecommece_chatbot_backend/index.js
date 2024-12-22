// BACKEND - E-commerce Sales Chatbot

// Step 1: Import Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Step 2: Initialize Express Application
const app = express();
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Step 3: Sample Product Catalog (Mock Data)
const productCatalog = [
    { id: 1, name: "Smartphone", price: 699, category: "Electronics" },
    { id: 2, name: "Laptop", price: 1299, category: "Electronics" },
    { id: 3, name: "Shoes", price: 79, category: "Fashion" },
    { id: 4, name: "Headphones", price: 199, category: "Electronics" },
    { id: 5, name: "Watch", price: 149, category: "Accessories" }
];

// Step 4: Define Routes

// Root Route
app.get('/', (req, res) => {
    res.send('E-commerce Sales Chatbot Backend is Running!');
});

// Chatbot Endpoint
app.post('/chatbot', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    // Default Response
    let responseMessage = "I'm here to assist you with your shopping needs!";

    // Handle Product Query
    if (userMessage.includes("product")) {
        responseMessage = "Here are some products: \n";
        productCatalog.forEach(product => {
            responseMessage += `- ${product.name} ($${product.price}) \n`;
        });
    } 
    // Handle Recommendations
    else if (userMessage.includes("recommend")) {
        const recommendation = productCatalog[0]; // Simple Recommendation Logic
        responseMessage = `I recommend the ${recommendation.name} for $${recommendation.price}.`;
    } 
    // Handle Price Inquiry
    else if (userMessage.includes("price")) {
        const productName = userMessage.split("price of")[1]?.trim();
        const product = productCatalog.find(p => p.name.toLowerCase() === productName);
        responseMessage = product ? 
            `${product.name} costs $${product.price}.` :
            "Sorry, I couldn't find that product.";
    } 
    // Handle Unknown Queries
    else {
        responseMessage = "Can you please rephrase your query?";
    }

    // Send Response
    res.json({ message: responseMessage });
});

// Step 5: Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Chatbot backend is running on http://localhost:${PORT}`);
});
