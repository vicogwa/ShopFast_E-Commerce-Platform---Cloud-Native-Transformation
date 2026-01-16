const pool = require("../config/database.cjs");

// Create order
const createOrder = async ({
  userId, orderItems, shipping, payment,
  itemsPrice, taxPrice, shippingPrice, totalPrice,
  isPaid = false, paidAt = null,
  isDelivered = false, deliveredAt = null
}) => {
  const result = await pool.query(
    `INSERT INTO orders
     (user_id, items_price, tax_price, shipping_price, total_price, is_paid, paid_at, is_delivered, delivered_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [userId, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt]
  );
  const order = result.rows[0];

  // Insert order items
  for (const item of orderItems) {
    await pool.query(
      `INSERT INTO order_items
       (order_id, product_id, name, quantity, price, image)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [order.id, item.productId, item.name, item.qty, item.price, item.image]
    );
  }

  // Insert shipping address
  await pool.query(
    `INSERT INTO shipping_addresses
     (order_id, address, city, postal_code, country)
     VALUES ($1,$2,$3,$4,$5)`,
    [order.id, shipping.address, shipping.city, shipping.postalCode, shipping.country]
  );

  return order;
};

// Get order by ID
const getOrderById = async (id) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
  return result.rows[0];
};

// Get all orders for a user
const getOrdersByUserId = async (userId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE user_id = $1`, [userId]);
  return result.rows;
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
};
