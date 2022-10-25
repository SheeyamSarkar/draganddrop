import { Router } from 'express';

import { getAllSubcategories,setSubcategory,updateSubcategory,deleteSubcategory } from '../../controllers/categorySubcategory/subcategoryController.js'

const router = Router();

router.route('/').get(getAllSubcategories).post(setSubcategory)
router.route('/:id').put(updateSubcategory).delete(deleteSubcategory)

// Export
export default router;