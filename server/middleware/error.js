export const notFound = (req, res) => res.status(404).json({ success: false, message: 'Route not found' })
export const errorHandler = (err, req, res, next) => { // never leak stack traces
  console.error(err); const status = err.name === 'ValidationError' ? 400 : err.status || 500
  res.status(status).json({ success: false, message: status === 500 ? 'Something went wrong' : err.message }) }
