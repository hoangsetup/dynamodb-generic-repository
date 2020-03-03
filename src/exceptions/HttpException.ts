/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
