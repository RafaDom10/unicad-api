import { type Request, type Response } from 'express'
import { container } from 'tsyringe'
import { CreateDeliveryUseCase } from '../usecases/CreateDeliveryUseCase'
import { UpdateDeliveryUseCase } from '../usecases/UpdateDeliveryUseCase'
import { ListDeliveriesUseCase } from '../usecases/ListDeliveriesUseCase'
import { DeleteDeliveryUseCase } from '../usecases/DeleteDeliveryUseCase'

export class DeliveryController {
  async store (request: Request, response: Response): Promise<Response> {
    const { client_name, delivery_date, starting_point, destination_point } = request.body

    const usecase = container.resolve(CreateDeliveryUseCase)
    const result = await usecase.execute({ client_name, delivery_date, starting_point, destination_point })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(201).json(result)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { client_name, delivery_date, starting_point, destination_point } = request.body

    const usecase = container.resolve(UpdateDeliveryUseCase)
    const result = await usecase.execute({ id, client_name, delivery_date, starting_point, destination_point }
      , id)

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.status(201).json(result)
  }

  async index (request: Request, response: Response): Promise<Response> {
    const usecase = container.resolve(ListDeliveriesUseCase)
    const result = await usecase.execute()
    return response.status(200).json(result)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const usecase = container.resolve(DeleteDeliveryUseCase)
    const result = await usecase.execute(String(id))

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message)
    }

    return response.sendStatus(204)
  }
}
