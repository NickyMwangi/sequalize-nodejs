
export const catchErrorAsync = (fn) => {
  const errorHandler = (req, res, next) => {
    fn(req, req, next).catch((err) => next(err));
  }
  return errorHandler;
}