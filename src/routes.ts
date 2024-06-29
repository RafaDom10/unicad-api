import { Router } from 'express'
import { DeliveryController } from './app/controllers/DeliveryController'

const deliveryController = new DeliveryController()

const router = Router()

router.post('/deliveries', deliveryController.store)
router.get('/deliveries', deliveryController.index)
router.put('/deliveries/:id', deliveryController.update)
router.delete('/deliveries/:id', deliveryController.delete)

export default router
