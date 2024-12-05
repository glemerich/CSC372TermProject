const path = require('path');
const Database = require('better-sqlite3');

// Define the path to the database file
const dbPath = path.join(__dirname, 'DB', 'CSC372TermProject.db');

// Connect to the database
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;