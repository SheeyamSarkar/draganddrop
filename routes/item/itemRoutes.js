import { Router } from 'express';
import multer from 'multer'
import fs from 'fs'

import { getAllItems,setItem,updateItem,deleteItem } from '../../controllers/item/itemController.js'


const router = Router();

const itemImageStorage = multer.diskStorage({
    
    //Autometacally Create Folder For Image
    destination: function(req, file, cb) {
        var dir = "public/images/itemImages";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const uploadItemImage = multer({storage: itemImageStorage})

router.route('/').get(getAllItems).post(uploadItemImage.single('image'), setItem)
router.route('/:id').put(uploadItemImage.single('image'), updateItem).delete(deleteItem)

// Export
export default router;