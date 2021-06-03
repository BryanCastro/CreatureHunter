require('dotenv').config()

const config = {
  serverURL: 'http://localhost',
  serverPORT: 5001,
  serverDatabase: process.env.SERVER_DB_TEST,
  jwtSecret: process.env.JWT_SECRET,
}

export default config
