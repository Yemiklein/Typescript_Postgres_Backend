/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { roleInstance } from "../../models/roles";
const secret = process.env.JWT_SECRET as string;
import { UserInstance } from "../../models/user";
import { usersGroupInstance } from "../../models/userGroup";


//access control middleware to give or restricts access to a route
export async function accessControl(
  req: Request | never,
  res: Response,
  next: NextFunction,
) {
  try {
    const address = req.url.split("/")[1];
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({
        Error:
         "Forbidden, you dont have user privilege to this route: ACCESS DENIED",
      });
    }

    const token = authorization?.slice(7, authorization.length) ;
    const verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(403).json({
        Error:
    "Forbidden, you dont have user privilege to this route: ACCESS DENIED",
      });
    }
    const { id } = verified as { [key: string]: string };

    const user = await UserInstance.findOne({ where: { id } });
    if (!user) {
      return res.status(403).json({
        Error:
         "Forbidden, you dont have user privilege to this route: ACCESS DENIED",
      });
    }

    req.user = verified;
    const role = await usersGroupInstance.findAll({
      where: { userId: req.user.id },
    });
    const groupIDS = role.map((item: any) => item.groupId);
    const approvedRole = (await roleInstance.findOne({
      where: { rolename: address },
    })) as unknown as { [key: string]: string | any };
    const uniqueGroupIDS = [...new Set(groupIDS)];

    if (uniqueGroupIDS.includes(approvedRole.groupId)) {
      next();
    } else {
      return res.status(403).json({
        Error:
      "Forbidden, you dont have user privilege to this route: ACCESS DENIED",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Error: "An error occured, access prohibited",
    });
  }
}
