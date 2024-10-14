export type Car = {
  id: string
  license_plate: string
  brand: string
  model: string
  year: number
  status: string
  km: number
  price: number
  items: string[]
  created_at: Date
  updated_at: Date
}

export type IRequests = {
  id: string
  page: number
  skip: number
  limit: number
  filters?: any
}

export type IResponse = {
  total: number
  total_pages: number
  limit: number
  data: Car[]
}

export interface ICarPaginate extends IResponse {}

export interface IRequestIndex extends Omit<IRequests, 'id' | 'skip'> {}

export interface ISearchParams extends Omit<IRequests, 'id'> {}

export interface IRequestCreate
  extends Omit<Car, 'id' | 'created_at' | 'updated_at'> {}

export interface IRequestUpdate
  extends Omit<Car, 'created_at' | 'updated_at'> {}

export interface IRequestShow
  extends Omit<IRequests, 'page' | 'skip' | 'limit' | 'filters'> {}
