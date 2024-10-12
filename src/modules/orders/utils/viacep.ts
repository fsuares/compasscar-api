import AppError from '@errors/AppError'
import axios from 'axios'

export async function locale({ cep }: { cep: string }): Promise<any> {
  const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  if (res.data.erro) {
    throw new AppError('CEP not found')
  }
  return res.data
}
