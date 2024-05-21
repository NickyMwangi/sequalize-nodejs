import express from 'express'
import { AuthRoutes, ProductRouter } from './src/routes/index.js';
import dotenv from 'dotenv'
dotenv.config({ path: `${process.cwd()}/.env` })


const app = express()
app.use(express.json()); //Allow to post and get json.
app.use(express.urlencoded({ extended: true }));

//product Endpoints
app.use('/api/v1/product', ProductRouter)

//product Endpoints
app.use('/api/v1/auth', AuthRoutes)

//Call NEXT to passs the error.
app.use('*', (req, res, next) => {
  const err = new Error('Endpoint not found');
  err.status = '404'
  next(err)
})

//global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || err || 'Error occurred while trying to react the endpoint'
    }
  })
})




app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT} and is up and running.`)
})