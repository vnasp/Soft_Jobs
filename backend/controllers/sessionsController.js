import { getUserByEmail } from '../models/usersModel.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { findError } from "../utils/utils.js"

const sessionUsers = async (req, res) => {
  const { email, password } = req.body
  try {
    const findUser = await getUserByEmail(email)
    if (!findUser) {
      const errorFound = findError("auth_01")
      return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message })
    } else {
      const isPasswordValid = bcrypt.compareSync(
        password,
        findUser.password
      )
      if (!isPasswordValid) {
        const errorFound = findError("auth_02")
        return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message })
      } else {
        const { email } = findUser
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        res.status(200).json({
          message: `Bienvenido, has iniciado sesion con el email ${email}`,
          code: 200,
          token,
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export { sessionUsers }