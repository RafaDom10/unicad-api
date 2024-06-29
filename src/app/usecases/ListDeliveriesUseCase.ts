import { inject, injectable } from 'tsyringe'
import { IDeliveryRepository } from '../repositories/IDeliveryRepository'
import { type Delivery } from '../model/Delivery'

@injectable()
export class ListDeliveriesUseCase {
  constructor (
    @inject('DeliveryRepository') private readonly deliveryRepo: IDeliveryRepository
  ) {}

  async execute (): Promise<Delivery[]> {
    const deliveries = await this.deliveryRepo.findAll()
    return deliveries
  }
}
