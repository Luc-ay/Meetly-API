import { ErrorCodeEnumType } from '../@types/error-code.enums'
import { HTTPSTATUS, HttpStatusCodeType } from '../config/http.config'

export class AppError extends Error {
  public statusCode: HttpStatusCodeType
  public errorCode?: ErrorCodeEnumType | undefined

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class InternalServerException extends AppError {
  constructor(
    message = 'Internal Server Error',
    errorCode?: ErrorCodeEnumType
  ) {
    super(
      message,
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCodeEnumType.INTERNAL_SERVER_ERROR
    )
  }
}

export class BadRequestException extends AppError {
  constructor(message = 'Bad Request', errorCode?: ErrorCodeEnumType) {
    super(
      message,
      HTTPSTATUS.BAD_REQUEST,
      errorCode || ErrorCodeEnumType.ACCESS_UNAUTHORIZED
    )
  }
}

export class NotFoundException extends AppError {
  constructor(message = 'Not Found', errorCode?: ErrorCodeEnumType) {
    super(
      message,
      HTTPSTATUS.NOT_FOUND,
      errorCode || ErrorCodeEnumType.RESOURCE_NOT_FOUND
    )
  }
}
