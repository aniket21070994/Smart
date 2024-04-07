import  express  from "express";
import{registerController,loginController,forgotpasswordController,testContropller,adminController} from '../controllers/authController.js'
import { adminCheck, requireSigneIn } from "../middelwares/authMiddelware.js";
//router object
const router=express.Router();
//routing
//register method POST
router.post("/register",registerController);
//LOGIN|| POST 
router.post('/login',adminCheck,loginController);
//forgot password
router.post("/forgot-password",forgotpasswordController);
//test token base authentication
router.post('/t',requireSigneIn,adminCheck,testContropller);

export default router;
