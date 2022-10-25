import { Router } from 'express';

import { getAllCards,setCard,updateCard,deleteCard } from '../controllers/cardController.js'


const router = Router();

router.route('/').get(getAllCards).post(setCard)
router.route('/:id').put(updateCard).delete(deleteCard)

// Export
export default router;