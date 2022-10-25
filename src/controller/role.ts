import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  options,
  createRoleSchema,
  updateRoleSchema,
} from "../utils/validation";
import { roleInstance } from "../models/roles";



export async function createRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const ValidateData = createRoleSchema.validate(req.body, options);

    if (ValidateData.error) {
      return res.status(400).json({
        Error: ValidateData.error.details[0].message,
      });
    }

    const record = await roleInstance.create({
      id: id,
      groupId: req.body.groupId,
      rolename: req.body.rolename,
      roledescription: req.body.roledescription,
      roleavatar:
        "https://i.pinimg.com/564x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg",
      rolepermissions: req.body.rolepermissions,
    });

    if (record) {
      res.status(201).json({ msg: "Role created successfully", record });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to create role",
      route: "/createrole",
    });
  }
}

export async function getRole(req: Request, res: Response) {
  try {
    const roleId = req.params.id;
    const record = (await roleInstance.findOne({
      where: { id: roleId },
    })) as unknown as { [key: string]: string };
    if (record) {
      res.status(200).json({ record: record });
    } else {
      res.status(404).json({
        message: "ROle not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Invalid group",
      route: "/getrole/:id",
    });
  }
}

export async function issueQuery(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res
      .status(201)
      .json({ msg: "You have user privilege to this functionality" });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Access forbidden",
      route: "/issue_query",
    });
  }
}

export async function securityCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res
      .status(201)
      .json({ msg: "You have user privilege to this functionality" });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Access forbidden",
      route: "/security_check",
    });
  }
}

export async function BranchManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res
      .status(201)
      .json({ msg: "You have user privilege to this functionality" });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Access forbidden",
      route: "/branch_manager",
    });
  }
}

export async function getRoles(
  req: Request,
  res: Response) {
  try {
    const record = await roleInstance.findAll();
    if (record) {
      res.status(200).json({ record: record });
    } else {
      res.status(404).json({
        message: "No role has been created",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Request not valid",
      route: "/getroles",
    });
  }
}

export async function updateRole(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { rolename } = req.body;
    const validateResult = updateRoleSchema.validate(req.body, options);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const record = await roleInstance.findByPk(id);
    if (!record) {
      res.status(404).json({
        Error: "cannot find role",
      });
    }
    const updaterecord = await record?.update({
      rolename,
    });
    res.status(201).json({
      message: "you have successfully updated your profile",
      record: updaterecord,
    });
  } catch (err) {
    res.status(500).json({
      msg: "failed to update profile",
      route: "/update/:id",
    });
  }
}
