import express,{Request,Response} from "express";
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import {body} from 'express-validator';

const router=express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5 * 1024 * 1024 //5Mb
    },
});

//api/my-hotels
router.post("/",
    verifyToken,[
        body("name").notEmpty().withMessage('Name is Required'),
        body("city").notEmpty().withMessage('City is Required'),
        body("country").notEmpty().withMessage('Country is Required'),
        body("description").notEmpty().withMessage('Description is Required'),
        body("type").notEmpty().withMessage('Hotel Type is Required'),
        body("pricePernight").notEmpty().isNumeric().withMessage('Price is Required and must be a number'),
        body("facilities").notEmpty().isArray().withMessage('Facilities is Required'),
      
    ],
     upload.array("imageFiles",6),
 async(req:Request,res:Response)=>{
    try {
        const imageFiles=req.files as Express.Multer.File[];
        const newHotel:HotelType=req.body;

        //upload the image to cloud
        const uploadPromises=imageFiles.map(async(image)=>{
            const b64=Buffer.from(image.buffer).toString("base64");
            let dataURI="data:"+image.mimetype+";base64,"+b64;
            const res=await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls=await Promise.all(uploadPromises);

        //add urls to the new hotel
        newHotel.imageUrls=imageUrls;
        newHotel.lastUpdated=new Date();
        newHotel.userId=req.userId;
        
        //save new hotel in db
        const hotel=new Hotel(newHotel);
        await hotel.save();

        //return a 201 status
        res.status(201).send(hotel);
    }
    catch(e){
        console.log("error creating hotel:",e);
        res.status(500).json({message:"Something went wrong"});
    }
});

export default router;