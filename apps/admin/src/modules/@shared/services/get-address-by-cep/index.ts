import { httpClientFetch } from '../../lib'
import { AddressByCepResponse } from './types'

export const getAddressByCep = async (
  cep: string
): Promise<[unknown, typeof formattedResponse | null]> => {
  const [error, response] = await httpClientFetch<AddressByCepResponse>({
    method: 'GET',
    baseURL: 'https://viacep.com.br/ws',
    url: `/${cep}/json`
  })

  if (response?.erro) {
    return [true, null]
  }

  const formattedResponse = {
    cep: response?.cep,
    address: response?.logradouro,
    complemento: response?.complemento,
    neighborhood: response?.bairro,
    city: response?.localidade,
    state: response?.uf
  }

  return [error, formattedResponse]
}
