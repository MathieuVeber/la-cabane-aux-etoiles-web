import { Request } from "express";

export default (cookieName: string) => (req: Request) => {
  let cookie = null;
  if (req && req.cookies) {
    cookie = req.cookies[cookieName];
  }
  return cookie;
};
