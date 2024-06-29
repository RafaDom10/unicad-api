import { inject, injectable } from 'tsyringe'
import { left, type Either, right } from '../errors/either'
import { GenericError } from '../errors/generic.error'
import { IDeliveryRepository } from '../repositories/IDeliveryRepository'

type Response = Either<GenericError, null>

@injectable()
export class DeleteDeliveryUseCase {
  constructor (
    @inject('DeliveryRepository') private readonly deliveryRepo: IDeliveryRepository
  ) {}

  async execute (id: string): Promise<Response> {
    const delivery = await this.deliveryRepo.findById(id)

    if (!delivery) {
      return left(new GenericError('Delivery not found', 404))
    }

    await this.deliveryRepo.delete(id)

    return right(null)
  }
}
