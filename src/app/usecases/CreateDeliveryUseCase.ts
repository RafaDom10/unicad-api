import { inject, injectable } from 'tsyringe'
import { left, type Either, right } from '../errors/either'
import { GenericError } from '../errors/generic.error'
import { type Delivery } from '../model/Delivery'
import { DeliveryRepository } from '../repositories/DeliveryRepository'

type Response = Either<GenericError, Delivery>

@injectable()
export class CreateDeliveryUseCase {
  constructor (
    @inject('DeliveryRepository') private readonly deliveryRepo: DeliveryRepository
  ) {}

  async execute (payload: Omit<Delivery, 'id'>): Promise<Response> {
    if (!payload.client_name) {
      return left(new GenericError('Client Name is required', 400))
    }

    if (!payload.starting_point) {
      return left(new GenericError('Starting point is required', 400))
    }

    if (!payload.destination_point) {
      return left(new GenericError('Destination point is required', 400))
    }

    const delivery = await this.deliveryRepo.create(payload)

    return right(delivery)
  }
}
