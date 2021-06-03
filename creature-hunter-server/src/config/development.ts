require('dotenv').config()

const config = {
  serverURL: process.env.SERVER_URL,
  serverPORT: process.env.SERVER_PORT,
  serverDatabase: process.env.SERVER_DB_DEV,
  jwtSecret: process.env.JWT_SECRET,
}

export default config
