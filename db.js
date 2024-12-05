c/*
  Name: Garrett Emerich
  Date: 12/03/2024
  Description: [script for easy db access]
*/
onst path = require('path');
const Database = require('better-sqlite3');

// Define the path to the database file
const dbPath = path.join(__dirname, 'DB', 'CSC372TermProject.db');

// Connect to the database
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;