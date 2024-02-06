import pool from "../database/connectionDB.js"
import bcrypt from "bcryptjs"

const getUserByEmail = async (email) => {
  const SQLquery = {
    text: "SELECT * FROM usuarios WHERE email = $1",
    values: [email],
  }
  try {
  const response = await pool.query(SQLquery);
  return response.rows[0];
  } catch (error) {
    console.log(error)
  }
}

const addUser = async (email, password, rol, lenguage) => {
  const hashedPassword = bcrypt.hashSync(password)
  const SQLquery = {
    text: "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *;",
    values: [email, hashedPassword, rol, lenguage]
  }
  try {
    const response = await pool.query(SQLquery)
    return response.rows
  } catch (error) {
    console.log(error)
  }
}

export { getUserByEmail, addUser }