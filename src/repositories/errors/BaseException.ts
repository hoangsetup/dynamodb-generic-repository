/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

export abstract class BaseException extends Error {
  protected constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}
