export const Login = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'login route is working'
  })
}

export const register = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'register route is working'
  })
}