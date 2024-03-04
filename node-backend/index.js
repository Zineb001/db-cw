const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const movieRoutes = require("./routes/MovieRoutes");
const genreRoutes = require("./routes/GenreRoutes");
const actorRoutes = require("./routes/ActorRoutes");
const directorRoutes = require("./routes/DirectorRoutes");


const app = express();
const port = 3001; // Ensure this matches the port in your docker-compose.yml
app.use(cors());
app.set('query parser', false);
app.use("/api", movieRoutes);
app.use("/api", genreRoutes);
app.use("/api", actorRoutes);
app.use("/api", directorRoutes);
// Set up the PostgreSQL client
const pool = new Pool({
  user: 'postgres',
  host: 'postgres', // This should match the service name in docker-compose.yml
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

app.get('/message', async (req, res) => {
  try {
    const result = await pool.query('SELECT text FROM messages LIMIT 1;');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:3001`);
});



