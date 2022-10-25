import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4, validate } from "uuid";
import { UserInstance }  from "../models/user";
import { validationSchema, options, loginSchema } from '../utils/validation'
import bcrypt from 'bcryptjs';
import {roleInstance} from "../models/roles";
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils/utils";
import { usersGroupInstance } from "../models/userGroup";
const secret = process.env.JWT_SECRET as string;



export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
    const id = uuidv4();
    try {
        const ValidateUser = validationSchema.validate(req.body,options);
        if (ValidateUser.error) {
            return res.status(400).json({
                Error: ValidateUser.error.details[0].message,
            });
        }
        const duplicatEmail = await UserInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please enter another email",
            });
        }

        const duplicatePhone = await UserInstance.findOne({
            where: { phonenumber: req.body.phonenumber },
        });

        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used",
            });
        }
        const passwordHash = await bcrypt.hash(req.body.password, 8);
        const record = await UserInstance.create({
            id: id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: passwordHash,
            isVerified: false,
            avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
        })
        if (record) {
           
        res.status(201).json({msg:"User created successfully",record})
        }  
    } catch (error) {
      console.log(error);
        res.status(500).json({
            message:'failed to register',
            route:'/create'

        })
    }
  }

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
     const userId = req.params.id;
     let user_group;
    const record = (await UserInstance.findOne({
        where: { id: userId },
        include: [{ model: usersGroupInstance, as: "groups" }],
      })) as unknown as { [key: string]: string|any };
    if (record) {
        let roleArray=[];
        const UserGroups=record.groups;
        for (let i=0; i<UserGroups.length; i++){
            let roles= await roleInstance.findAll({
                where:{groupId:UserGroups[i].groupId},
              })
                roleArray.push(roles)
        }
        console.log(roleArray)
       const theGroup= UserGroups.forEach( (group:any)=>{
            const UserGroup:any=  roleInstance.findAll({
                where:{id:group.groupId},
              })
                console.log(group.groupId,UserGroups.length)
        })
           
console.log(record.groups)
    res.status(200).json({"record":record,
        "roles":roleArray});
    } else {
        res.status(404).json({
            message: "User not found",
        });
        }
  } catch (error) {
    res.status(500).json({
      msg: "Invalid User",
      route: "/getuser/:id",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      });
    }
    const userEmail = req.body.email;
    const userName = req.body.username;
    const record = userEmail
      ? ((await UserInstance.findOne({
          where: [{ email: userEmail }]
        })) as unknown as { [key: string]: string })
      : ((await UserInstance.findOne({
          where: [{ username: userName }]
        })) as unknown as { [key: string]: string });
        
        if(record){
      const { id } = record;
      const { password } = record;

      const token = generateToken({ id });
      const validUser = await bcrypt.compare(req.body.password, password);

      if (!validUser) {
        return res.status(401).json({
          msg: 'Password do not match'
        });
      }

      if (validUser) {
        res.status(200).json({
          status: 'success',
          msg: 'login successful',
          record: record,
          token: token
        });
      }
    } else{
      return res.status(400).json({
        msg: "incorrect username/email"
      });
    }
   } catch (err) {
    res.status(500).json({
      msg: 'Incorrect username or email',
      route: '/login'
    });
  }
}

export async function getAllUser(
                req: Request,
                res: Response,
                next: NextFunction
              ) {
                try {
                  
                  const record = await UserInstance.findAll();
                  if (record) {
              
                  res.status(200).json({"record":record});
                  } else {
                      res.status(404).json({
                          message: "User not found",
                      });
                      }
                } catch (error) {
                  res.status(500).json({
                    msg: "Invalid User",
                    route: "/getalluser",
                  });
                }
              }


         