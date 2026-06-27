export const STATUS_CODE = {
  BAD_REQUEST: 400,
  SERVERERROR: 500,
  NOTFOUND: 404,
  SUCCESS: 200,
  CREATED: 201,
};

export class Base_error extends Error {
  status = STATUS_CODE.SERVERERROR;
  constructor(message, options) {
    super(message, options);
    this.status = options.status;
  }
}

export const NotFoundError = (message, options = {}) => {
  return new Base_error(message, {
    ...options,
    status: STATUS_CODE.NOTFOUND,
  });
};

export const BadRequestError = (message, options = {}) => {
  return new Base_error(message, {
    ...options,
    status: STATUS_CODE.BAD_REQUEST,
  });
};
