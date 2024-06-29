import { type Delivery } from '../model/Delivery'

export interface IDeliveryRepository {
  findAll: () => Promise<Delivery[]>
  findById: (id: string) => Promise<Delivery>
  create: ({ client_name, delivery_date, destination_point, starting_point }: Omit<Delivery, 'id'>) => Promise<Delivery>
  update: ({ client_name, delivery_date, destination_point, starting_point }: Delivery, id: string) => Promise<Delivery>
  delete: (id: string) => Promise<void>
}
