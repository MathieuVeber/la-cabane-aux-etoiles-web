import { Request, Response, NextFunction } from "express";
import { IParent } from "../models/parents";
import ErrorTypes from "../utils/ErrorTypes";

/*
  Description :
    Allow only admin or the relevant parent to access the route

  Success :
    Token id matches with idParent route params or refers to an admin account

  Error :
    (403) The token does not refer to an admin
      && idParent route param is different from the token id
    (500) authenticatedRoute middleware has not been used before
    (500) :idParent is missing in req.params

  Usages :
    authenticatedRoute middleware must be called beforehand.
    Must not be combined with another RestrictedRoute middleware.
    Can be used only if idParent is a param of the route.
*/

const selfOrAdminRestrictedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.params.idParent) {
    return res.status(500).send(ErrorTypes.SERVER_ERROR);
  } else if (
    req.user != req.params.idParent &&
    !(req.user as IParent).isAdmin
  ) {
    return res.status(403).send(ErrorTypes.ACCESS_FORBIDDEN);
  }
  next();
};

export default selfOrAdminRestrictedRoute;
