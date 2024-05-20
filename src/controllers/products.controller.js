import { pgClient } from "../../pg-connect.js"
import { getAllProductsQuery, getProductsByIdQuery, getProductsByNameQuery, addProductQuery, deleteProductQuery, updateProductQuery } from "../dbQueries/index.js"

export const getAllProducts = (req, res, next) => {
  pgClient.query(getAllProductsQuery, (err, results) => {
    if (err) next(err)
    res.status(200).json(results.rows)

  })
}

export const getProductByID = (req, res, next) => {
  const id = parseInt(req.params.id);
  pgClient.query(getProductsByIdQuery, [id], (err, results) => {
    if (err) next(err)
    res.status(200).json(results.rows)

  })
}

export const addProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  //check if the product exists
  pgClient.query(getProductsByNameQuery, [name], (err, results) => {
    if (err) next(err)
    else if (results.rows.length)
      next('Product already exists.')
    else {
      pgClient.query(addProductQuery, [name, description, price], (err, results) => {
        if (err) next(err)
        res.status(201).send('Product created successfully')
      })
    }
  })
}

export const deleteProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  //check if the product exists
  pgClient.query(getProductsByIdQuery, [id], (err, results) => {
    const noProductFound = !results.rows.length;
    if (noProductFound) next('Product does not exist in the database.')
    else if (results.rows.length) {
      pgClient.query(deleteProductQuery, [id], (err, results) => {
        if (err) next(err)
        res.status(201).send('Product deleted successfully')
      })
    }
  })
}

export const updateProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;
  //check if the product exists
  pgClient.query(getProductsByIdQuery, [id], (err, results) => {
    const noProductFound = !results.rows.length;
    if (noProductFound) next('Product does not exist in the database.')
    else if (results.rows.length) {
      pgClient.query(updateProductQuery, [id, name, description, price], (err, results) => {
        if (err) next(err)
        res.status(201).send('Product updated successfully')
      })
    }
  })
}
