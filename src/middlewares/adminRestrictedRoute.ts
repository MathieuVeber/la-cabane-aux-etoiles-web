import { Request, Response, NextFunction } from "express";
import { IParent } from "../models/parents";
import ErrorTypes from "../utils/ErrorTypes";

/*
  Description :
    Allow admin to access routes that are not accessible otherwise.

  Success :
    Token id refers to an admin account

  Error :
    (403) Token id refers to a parent that is not admin
    (500) authenticatedRoute middleware has not been used before

  Usages :
    authenticatedRoute middleware must be called beforehand.
    Must not be combined with another RestrictedRoute middleware.
*/

const adminRestrictedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(500).send(ErrorTypes.SERVER_ERROR);
  } else if (!(req.user as IParent).isAdmin) {
    return res.status(403).send(ErrorTypes.ACCESS_FORBIDDEN);
  }
  next();
};

export default adminRestrictedRoute;
