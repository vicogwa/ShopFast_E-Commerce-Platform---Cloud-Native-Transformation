const pool = require("../config/database.cjs");

// Create a product
const createProduct = async (product) => {
  const {
    name, image, brand, price, category, countInStock,
    description, rating = 0, numReviews = 0
  } = product;

  const result = await pool.query(
    `INSERT INTO products
     (name, image, brand, price, category, count_in_stock, description, rating, num_reviews)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [name, image, brand, price, category, countInStock, description, rating, numReviews]
  );
  return result.rows[0];
};

// Get all products
const getAllProducts = async () => {
  const result = await pool.query(`SELECT * FROM products`);
  return result.rows;
};

// Get product by ID
const getProductById = async (id) => {
  const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
