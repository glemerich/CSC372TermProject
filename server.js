/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for main server]
*/
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// Redirect root to /src/html/index.html
app.get('/', (req, res) => {
    res.redirect('/src/html/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
