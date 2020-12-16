import { Request, Response, NextFunction } from "express";
import ErrorTypes from "../utils/ErrorTypes";

/*
  Description :
    Allow parents to access routes that concerns ONLY themselves.

  Success :
    Token id matches with idParent route params

  Error :
    (403) Token id and idParent route params are different
    (500) authenticatedRoute middleware has not been used before
    (500) :idParent is missing in req.params

  Usages :
    authenticatedRoute middleware must be called beforehand.
    Must not be combined with another RestrictedRoute middleware.
    Can be used only if idParent is a param of the route.
*/

const selfRestrictedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.params.idParent) {
    return res.status(500).send(ErrorTypes.SERVER_ERROR);
  } else if (req.user != req.params.idParent) {
    return res.status(403).send(ErrorTypes.ACCESS_FORBIDDEN);
  }
  next();
};

export default selfRestrictedRoute;
