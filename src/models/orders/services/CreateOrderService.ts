import AppError from '@errors/AppError'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { CustomersRepository } from '@customers/repositories/CustomersRepository'
import { ICreateOrder } from '@orders/interfaces/OrdersInterface'
import { feeValues } from '@orders/utils/order.fee'

export class CreateOrderService {
  public async execute({
    customer_id,
    car_id,
    cep,
    city,
    uf,
    start_date,
    end_date
  }: ICreateOrder & { uf: keyof typeof feeValues }): Promise<any> {
    const carOrder = await OrdersRepository.findByCar(car_id)
    carOrder.forEach((order) => {
      if (order.status === 'open' || order.status === 'approved') {
        throw new AppError('Car currently rented', 409)
      }
    })

    const customerOrder = await OrdersRepository.findByCustomer(customer_id)
    customerOrder.forEach((order) => {
      if (order.status === 'open' || order.status === 'approved') {
        throw new AppError('Customer currently renting a car', 409)
      }
    })

    const car = await CarsRepository.findByID(car_id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }

    const customer = await CustomersRepository.findByID(customer_id)
    if (!customer) {
      throw new AppError('Customer not found', 404)
    }

    const total_value =
      ((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24)) *
        car.price +
      feeValues[uf]

    const order = await OrdersRepository.create({
      customer,
      cep,
      city,
      uf,
      order_fee: feeValues[uf],
      total_value,
      car,
      start_date,
      end_date
    })

    await OrdersRepository.save(order)
    return order
  }
}
