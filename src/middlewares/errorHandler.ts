import { NextFunction, Request, Response } from "express";

const DEFAULT_ERROR_MESSAGE = "Unexpected server error accurd...";
const DEFAULT_ERROR_STATUS = 500;

type ErrorType = {
  details?: unknown;
  code?: number;
  message?: string;
};

export class ServerError extends Error {
  readonly details: unknown;
  readonly code: number;

  constructor({ details, code, message }: ErrorType) {
    super(message || DEFAULT_ERROR_MESSAGE);
    this.code = code || DEFAULT_ERROR_STATUS;
    this.details = details || "";
  }
}

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ServerError) {
    console.error("[ ServerError ] ", err);
    res.status(err.code).send({ message: err.message });
  } else {
    console.error("[unknown error] ", err);
    res.status(DEFAULT_ERROR_STATUS).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};
