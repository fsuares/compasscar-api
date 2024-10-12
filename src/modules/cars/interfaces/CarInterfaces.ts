import { Car } from '@cars/entities/Car'

export interface IRequestIndex {
  page: number
  limit: number
  filters?: any
}

export interface ICarPaginate {
  total: number
  total_pages: number
  per_page: number
  data: Car[]
}

export interface ISearchParams {
  page: number
  skip: number
  take: number
  filters?: any
}

export interface IRequestUpdate {
  id: string
  license_plate: string
  brand: string
  model: string
  km: number
  year: number
  price: number
  items: string[]
  status: string
}

export interface IRequestShow {
  id: string
}
