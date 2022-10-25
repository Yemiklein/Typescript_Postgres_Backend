import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

export const validationSchema = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  phonenumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().required(),
  confirmpassword: Joi.ref('password')
}).with('password', 'confirmpassword');

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().lowercase(),
  username: Joi.string().trim(),
  password: Joi.string().trim()
});


//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: '7d' });
};


export const createGroupSchema = Joi.object({
  groupname: Joi.string().trim().required(),
  groupdescription: Joi.string().trim().required(),
});


export const createRoleSchema=Joi.object({
groupId:Joi.string().trim().required(),
rolename:Joi.string().trim().required(),
roledescription:Joi.string().trim().required(),
rolepermissions:Joi.boolean().required(),
})

export const createUsersGroupSchema=Joi.object({
  groupId:Joi.string().trim().required(),
  userId:Joi.string().trim().required(),
  })
  export  const updateRoleSchema=Joi.object({
    rolename:Joi.string().trim().required(),
  })
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ''
    }
  }
};
