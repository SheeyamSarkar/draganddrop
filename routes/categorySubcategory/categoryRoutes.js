// Imports
import { Router } from 'express';

import { getAllCategories,setCategory,updateCategory,deleteCategory } from '../../controllers/categorySubcategory/categoryController.js';

const router = Router();

router.route('/').get(getAllCategories).post(setCategory)
router.route('/:id').put(updateCategory).delete(deleteCategory)


// Export
export default router;