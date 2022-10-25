// Imports
import { Router } from 'express';
import multer from 'multer';

import { registerEmployee, loginEmployee, getMe, getAllEmployees } from '../../controllers/authControllers/employeeController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = Router()

const employeeImagesStorage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/images/authImages/employeeImages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const uploadEmployeeImage = multer({storage: employeeImagesStorage})

router.get('/', getAllEmployees)
router.post('/register', uploadEmployeeImage.single('dp'), registerEmployee);
router.post('/login', loginEmployee);
router.get('/', protect, getMe);

export default router;