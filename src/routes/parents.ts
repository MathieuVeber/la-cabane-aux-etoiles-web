import Router from "express";
import { Request, Response } from "express";
import authenticatedRoute from "../middlewares/authenticatedRoute";
import selfRestrictedRoute from "../middlewares/selfRestrictedRoute";
import selfOrAdminRestrictedRoute from "../middlewares/selfOrAdminRestrictedRoute";
import ErrorTypes from "../utils/ErrorTypes";
import { IParent, Parent } from "../models/parents";

// TODO-MV :
// - Write validation

const router = Router();

router.get(
  "/:idParent",
  authenticatedRoute,
  selfOrAdminRestrictedRoute,
  async (req: Request, res: Response) => {
    let parent: IParent | null;
    try {
      parent = await Parent.findById(req.params.id);
    } catch (err) {
      return res.status(500).send(ErrorTypes.SERVER_ERROR);
    }
    if (!parent) {
      return res.status(404).send(ErrorTypes.PARENT_NOT_FOUND);
    }
    return res.status(200).json(parent);
  }
);

router.patch(
  "/:idParent",
  authenticatedRoute,
  selfRestrictedRoute,
  async (req: Request, res: Response) => {
    let parent: IParent | null;
    try {
      parent = await Parent.findByIdAndUpdate(req.params.id, req.body);
    } catch (err) {
      return res.status(500).send(ErrorTypes.SERVER_ERROR);
    }
    if (!parent) {
      return res.status(404).send(ErrorTypes.PARENT_NOT_FOUND);
    }
    return res.sendStatus(204);
  }
);

router.delete(
  "/:idParent",
  authenticatedRoute,
  selfRestrictedRoute,
  async (req: Request, res: Response) => {
    let parent: IParent | null;
    try {
      parent = await Parent.findByIdAndDelete(req.params.id);
    } catch (err) {
      return res.status(500).send(ErrorTypes.SERVER_ERROR);
    }
    if (!parent) {
      return res.status(404).send(ErrorTypes.PARENT_NOT_FOUND);
    }
    return res.sendStatus(204);
  }
);

export default router;
