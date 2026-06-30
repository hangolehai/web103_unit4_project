import { pool } from '../config/database.js';

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createCar = async (req, res) => {
    try {
        const { name, is_convertible, exterior, roof, wheels, interior, price } = req.body;
        const results = await pool.query(
            'INSERT INTO cars (name, is_convertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, is_convertible, exterior, roof, wheels, interior, price]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, is_convertible, exterior, roof, wheels, interior, price } = req.body;
        const results = await pool.query(
            'UPDATE cars SET name = $1, is_convertible = $2, exterior = $3, roof = $4, wheels = $5, interior = $6, price = $7 WHERE id = $8 RETURNING *',
            [name, is_convertible, exterior, roof, wheels, interior, price, id]
        );
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM cars WHERE id = $1', [id]);
        res.status(200).json({ message: `Car deleted with ID: ${id}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};
