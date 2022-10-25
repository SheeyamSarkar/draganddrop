import { Router } from 'express';

import { getAllItemSubcategories,setItemSubcategory,updateItemSubcategory,deleteItemSubcategory } from '../../controllers/categorySubcategory/itemSubcategoryController.js'

const router = Router();

router.route('/').get(getAllItemSubcategories).post(setItemSubcategory)
router.route('/:id').put(updateItemSubcategory).delete(deleteItemSubcategory)

// Export
export default router;