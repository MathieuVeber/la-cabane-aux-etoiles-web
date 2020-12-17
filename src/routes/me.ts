import Router from "express";
import { Request, Response } from "express";
import authenticatedRoute from "../middlewares/authenticatedRoute";
import { IParent, ISafeParent } from "../models/parents";

const router = Router();

router.get("/", authenticatedRoute, async (req: Request, res: Response) => {
  const safeParent: ISafeParent = (req.user as IParent).getSafeParent();
  return res.status(200).json(safeParent);
});

export default router;
