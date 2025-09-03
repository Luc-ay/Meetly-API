import { ErrorRequestHandler } from 'express'
import { HTTPSTATUS } from '../config/http.config'
import { AppError } from '../utils/app.error'

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log(`Error Occurred on PATH: ${req.path}`, error)
  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      status: HTTPSTATUS.BAD_REQUEST,
      message: 'Invalid JSON format. Please check your request body.',
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    })
  }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    status: HTTPSTATUS.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong, please try again later',
    error: error?.message || 'Unknown error occurred',
  })
}
