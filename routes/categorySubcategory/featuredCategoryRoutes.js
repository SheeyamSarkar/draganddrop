import { Router } from 'express';

import { getAllFeaturedCategories,setFeaturedCategory,updateFeaturedCategory,deleteFeaturedCategory } from '../../controllers/categorySubcategory/featuredCategoryController.js'

const router = Router();

router.route('/').get(getAllFeaturedCategories).post(setFeaturedCategory)
// router.route('/findCat').post(findCat)
router.route('/:id').put(updateFeaturedCategory).delete(deleteFeaturedCategory)

// Export
export default router;