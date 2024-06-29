import { client } from '../../database'
import { type IDeliveryRepository } from './IDeliveryRepository'
import { type Delivery } from '../model/Delivery'

export class DeliveryRepository implements IDeliveryRepository {
  async findAll (): Promise<Delivery[]> {
    const { rows } = await client.query(`
      SELECT deliveries.*
      FROM deliveries
    `)
    return rows
  }

  async findById (id: string): Promise<Delivery> {
    const { rows } = await client.query(`
      SELECT deliveries.*
      FROM deliveries
      WHERE deliveries.id = $1`, [id])
    return rows[0]
  }

  async create ({ client_name, delivery_date, destination_point, starting_point }: Omit<Delivery, 'id'>): Promise<Delivery> {
    const { rows } = await client.query(`
      INSERT INTO deliveries(client_name, delivery_date, destination_point, starting_point)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [client_name, delivery_date, destination_point, starting_point])

    return rows[0]
  }

  async update ({ client_name, delivery_date, destination_point, starting_point }: Delivery, id: string): Promise<Delivery> {
    const { rows } = await client.query(`
      UPDATE deliveries
      SET client_name = $1, delivery_date = $2, destination_point = $3, starting_point = $4
      WHERE id = $5
      RETURNING *
    `, [client_name, delivery_date, destination_point, starting_point, id])

    return rows[0]
  }

  async delete (id: string): Promise<void> {
    await client.query(`
      DELETE FROM deliveries
      WHERE id = $1
    `, [id])
  }
}
