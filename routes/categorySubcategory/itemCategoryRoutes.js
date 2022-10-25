import { Router } from 'express';

import { getAllItemCategories,setItemCategory,updateItemCategory,deleteItemCategory } from '../../controllers/categorySubcategory/itemCategoryController.js'

const router = Router();

router.route('/').get(getAllItemCategories).post(setItemCategory)
router.route('/:id').put(updateItemCategory).delete(deleteItemCategory)

// Export
export default router;