import { Base_error, STATUS_CODE } from "../errors/error.js";

export const errorMiddleware = async (err, req, res, next) => {
  const errMsg = err.message;
  const status = err.status;

  if (err instanceof Base_error) {
    res.status(status).json({ error: errMsg });
  } else {
    console.log(err);
    res.status(STATUS_CODE.SERVERERROR).json({ error: "Something went wrong" });
  }
};
