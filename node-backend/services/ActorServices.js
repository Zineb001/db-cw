const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'coursework',
  password: 'mysecretpassword',
  port: 5432,
});

async function getActors() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT DISTINCT "name" FROM VIEW_ACTOR');
    client.release();

    const uniqueActorNames = result.rows.map(row => row.name);
    return uniqueActorNames;
  } catch (error) {
    throw new Error("Failed to fetch actors");
  }
}

module.exports = {
  getActors,
};
