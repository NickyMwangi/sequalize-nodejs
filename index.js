import express from 'express'
import { AuthRoutes, ProductRouter } from './src/routes/index.js';
import dotenv from 'dotenv'
import { catchErrorAsync } from './src/utils/catchErrorAsync.js';
import { AppError } from './src/utils/appError.js';
dotenv.config({ path: `${process.cwd()}/.env` })


const app = express()
app.use(express.json()); //Allow to post and get json.
app.use(express.urlencoded({ extended: true }));

//product Endpoints
app.use('/api/v1/product', ProductRouter)

//product Endpoints
app.use('/api/v1/auth', AuthRoutes)

//Call NEXT to passs the error.
app.use('*', catchErrorAsync(async (req, res, next) => {
  throw new AppError('Invalid endPoint', '404');
}))

//global error handler. Middleware to catch the error.
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    stack: err.stack
  });

})




app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT} and is up and running.`)
})