/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { BaseException } from './BaseException';

export class EntityNotFoundException extends BaseException {
  constructor(entityName: string) {
    super(`${entityName} not found!`);
  }
}
