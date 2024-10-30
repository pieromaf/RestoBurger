const pool = require('../config/database');

// Obtener productos
const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Añadir un producto
const addProduct = async (req, res) => {
  const { title, price, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (title, price, description) VALUES ($1, $2, $3) RETURNING *',
      [title, price, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, addProduct, deleteProduct };
