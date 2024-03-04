const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'postgres', // This should match the service name in docker-compose.yml
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

async function getGenreNames() {
  try {
    // Fetch genres
    const client = await pool.connect();
    const result = await client.query('SELECT name FROM "GENRE"'); // Only select the name column
    client.release();
    
    const genreNames = result.rows.map(row => row.name);

    return genreNames;
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
}

module.exports = {
  getGenreNames,
};
