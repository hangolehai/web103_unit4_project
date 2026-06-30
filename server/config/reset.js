import { pool } from './database.js';

const createCarsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS cars;

    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      is_convertible BOOLEAN NOT NULL,
      exterior VARCHAR(50) NOT NULL,
      roof VARCHAR(50) NOT NULL,
      wheels VARCHAR(50) NOT NULL,
      interior VARCHAR(50) NOT NULL,
      price INTEGER NOT NULL
    )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 cars table created successfully');
  } catch (err) {
    console.error('⚠️ error creating cars table', err);
  }
}

const seedCarsTable = async () => {
    await createCarsTable();
}

seedCarsTable();
