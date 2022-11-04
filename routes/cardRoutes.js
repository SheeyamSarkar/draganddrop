import { Router } from 'express';

import { getAllCards,setCard,updateCard,deleteCard, reorderCards } from '../controllers/cardController.js'


const router = Router();

router.route('/').get(getAllCards).post(setCard)
router.route('/:id').put(updateCard).delete(deleteCard)
router.route('/:source/:destination').patch(reorderCards)

// Export
export default router;