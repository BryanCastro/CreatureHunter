import * as express from 'express'
import * as cors from 'cors'

const app = express()
const PORT = 3333

app.use(cors())

app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`)
})

export default app
