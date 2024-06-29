import { inject, injectable } from 'tsyringe'
import { left, type Either, right } from '../errors/either'
import { GenericError } from '../errors/generic.error'
import { IDeliveryRepository } from '../repositories/IDeliveryRepository'
import { type Delivery } from '../model/Delivery'

type Response = Either<GenericError, Delivery>

@injectable()
export class UpdateDeliveryUseCase {
  constructor (
    @inject('DeliveryRepository') private readonly deliveryRepo: IDeliveryRepository
  ) {}

  async execute (payload: Delivery, id: string): Promise<Response> {
    const delivery = await this.deliveryRepo.findById(id)

    if (!delivery) {
      return left(new GenericError('Delivery not found', 404))
    }

    if (!payload.client_name) {
      return left(new GenericError('Client Name is required', 400))
    }

    if (!payload.starting_point) {
      return left(new GenericError('Starting point is required', 400))
    }

    if (!payload.destination_point) {
      return left(new GenericError('Destination point is required', 400))
    }

    const result = await this.deliveryRepo.update(payload, id)

    return right(result)
  }
}
