// import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  options,
  createGroupSchema,
  createUsersGroupSchema,
} from "../utils/validation";
import { groupInstance } from "../models/group";
import { usersGroupInstance } from "../models/userGroup";




export async function createGroup(
  req: Request,
  res: Response,
) {
  const id = uuidv4();
  try {
    const ValidateData = createGroupSchema.validate(req.body, options);
    if (ValidateData.error) {
      return res.status(400).json({
        Error: ValidateData.error.details[0].message,
      });
    }
    const record = await groupInstance.create({
      id: id,
      groupname: req.body.groupname,
      groupdescription: req.body.groupdescription,
      groupavatar:
        "https://i.pinimg.com/564x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg",
    });
    if (record) {
      res.status(201).json({ msg: "Group created successfully", record });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to create group",
      route: "/creategroup",
    });
  }
}

export async function getGroup(
  req: Request,
  res: Response) {
  try {
    const groupId = req.params.id;

    const record = (await groupInstance.findOne({
      where: { id: groupId },
      // include: [{ model: roleInstance, as: "roles" }],
    })) as unknown as { [key: string]: string };

    if (record) {
      res.status(200).json({ record: record });
    } else {
      res.status(404).json({
        message: "Group not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Invalid group",
      route: "/getgroup/:id",
    });
  }
}

export async function getGroups(
  req: Request,
  res: Response) {
  try {
    const record = await groupInstance.findAll();
    if (record) {
      res.status(200).json({ record: record });
    } else {
      res.status(404).json({
        message: "No grboup has been created",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Invalid request",
      route: "/getgroup",
    });
  }
}

export async function addUserToGroup(
  req: Request,
  res: Response) {
  const id = uuidv4();
  try {
    const ValidateData = createUsersGroupSchema.validate(req.body, options);
    if (ValidateData.error) {
      return res.status(400).json({
        Error: ValidateData.error.details[0].message,
      });
    }

    const _group = (await groupInstance.findOne({
      where: { id: req.body.groupId },
    })) as unknown as { [key: string]: string };
    const groupName = _group.groupname;
    const record = await usersGroupInstance.create({
      id: id,
      userId: req.body.userId,
      groupId: req.body.groupId,
      groupname: groupName,
    });
    if (record) {
      res
        .status(201)
        .json({
          msg: `User has been added successfully to the ${groupName} group`,
          record,
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to create group",
      route: "/creategroup",
    });
  }
}
