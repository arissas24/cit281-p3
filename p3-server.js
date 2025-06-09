/*
    CIT 281 Project 3
    Name: Arissa Samaniego
*/

const express = require('express');
const { coinCombo, coinValue} = require('./p3-module');

const app = express();

app.use(express.static('public'));

app.get('/coincombo', (req, res) => {
    const amount = parseInt(req.query.amount, 10);
    if (isNaN(amount) || amount < 0) {
        return res.json({ error: 'Invalid amount' });
    }
    const result = coinCombo(amount);
    res.json(result);
});

app.get('/coinvalue', (req, res) => {
    const { pennies, nickels, dimes, quarters, halves, dollars } = req.query;
    const coinCounts = {
        pennies: parseInt(pennies, 10) || 0,
        nickels: parseInt(nickels, 10) || 0,
        dimes: parseInt(dimes, 10) || 0,
        quarters: parseInt(quarters, 10) || 0,
        halves: parseInt(halves, 10) || 0,
        dollars: parseInt(dollars, 10) || 0
    };
    const result = coinValue(coinCounts);
    res.json(result);
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
