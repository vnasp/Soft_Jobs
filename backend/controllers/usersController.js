import { addUser, getUserByEmail } from '../models/usersModel.js'
import { findError } from "../utils/utils.js"

const addUsers = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body
    const newUser = await addUser(email, password, rol, lenguage)
    res.status(200).json(newUser)
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }}

const getProfiles = async (req, res) => {
  try {
    const { email } = req.user;
    const userData = await getUserByEmail(email);
    res.status(200).json([userData]);
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
}


export { addUsers, getProfiles}