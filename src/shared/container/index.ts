import { container } from 'tsyringe'
import { DeliveryRepository } from '../../app/repositories/DeliveryRepository'
import { type IDeliveryRepository } from '../../app/repositories/IDeliveryRepository'

container.registerSingleton<IDeliveryRepository>('DeliveryRepository', DeliveryRepository)
