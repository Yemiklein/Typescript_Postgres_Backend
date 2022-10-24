import express from 'express';
import joi from "joi"
import jwt from "jsonwebtoken";

export const generateToken=(user:{[key:string]:unknown}):unknown=>{
    const pass = process.env.JWT_SECRET as string
     return jwt.sign(user,pass, {expiresIn:'7d'})
}