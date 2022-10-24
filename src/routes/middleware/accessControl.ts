import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET as string;
import { UserInstance } from '../../models/user';

export async function accessControl (req:Request | any,res:Response,next:NextFunction){
  try{
   
    const address= req.url.split('/')[1];
    console.log(address)
     const authorization = req.headers.authorization;
     if(!authorization){
         return res.status(403).json({
             Error:'Forbidden, you dont have user privilege to this route: ACCESS DENIED'
         })
     }
    
     const token = authorization?.slice(7,authorization.length) as string;
     let verified = jwt.verify(token, secret);
 
     if(!verified){
         return res.status(403).json({
             Error: 'Forbidden, you dont have user privilege to this route: ACCESS DENIED'
         })
     }
     const {id} = verified as {[key:string]:string}
 
     const user = await UserInstance.findOne({where:{id}})
     if(!user){
         return res.status(403).json({
             Error:'Forbidden, you dont have user privilege to this route: ACCESS DENIED'
         })
         
     }
     req.user = verified 
     next()
  }catch (error){
     return res.status(500).json({
         Error:"An error occured, access prohibited"
     })
    
  }
 
 }
