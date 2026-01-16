const pool = require("../config/database.cjs");

// Create a user
const createUser = async ({ name, email, password, isAdmin = false }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, is_admin)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, password, isAdmin]
  );
  return result.rows[0];
};

// Get user by email
const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Get user by ID
const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
