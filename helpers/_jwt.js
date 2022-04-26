import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: `./.env.local` })

export const generateToken = async (user) => {
  return await jwt.sign({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// verify token and check if it is valid
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, {maxAge: '1h'} ,(err, decoded) => {
    if (err) {
      return false
    }
    return decoded
  })
}

// decode token
export const decodeToken = async (token) => {
  return jwt.decode(token, { complete: true })
}

// get user id from token
export const getUserId = async (token) => {
  const decoded = await decodeToken(token)
  return decoded.id
}

// get user email from token
export const getUserEmail = async (token) => {
  const decoded = await decodeToken(token)
  return decoded.email
}

// get user isAdmin from token
export const getUserIsAdmin = async (token) => {
  const decoded = await decodeToken(token)
  return decoded.isAdmin
}


