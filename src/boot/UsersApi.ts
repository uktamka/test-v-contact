import { User, ApiQuery } from 'src/types'
import { AxiosReqConfig, api, defaultLimit } from 'boot/axios'
export const getUsers = async (
  params: ApiQuery = { _limit: defaultLimit, _page: 1 },
  options: AxiosReqConfig
): Promise<{
  total: number
  page: number
  limit: number
  items: Array<User>
}> => {
  try {
    const { data, headers } = await api.get('/users', { ...options, params })

    return {
      items: data,
      total: headers['X-Total-Count'] || data.length,
      limit: params._limit as number,
      page: params._page as number,
    }
  } catch (_) {
    return { total: 0, limit: 0, page: 0, items: [] }
  }
}

export const createUser = async (
  user: Omit<User, 'id'>,
  options: AxiosReqConfig
): Promise<User | boolean> => {
  try {
    const { data } = await api.post('/users', { ...options, data: user })
    return data
  } catch (_) {
    return false
  }
}

export const editUser = async (
  user: Partial<User>,
  options: AxiosReqConfig
): Promise<User | boolean> => {
  try {
    const { id } = user
    delete user.id
    const { data } = await api.patch(`/users/${id}`, {
      ...options,
      data: user,
    })
    return data
  } catch (_) {
    return false
  }
}

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}`)
    return true
  } catch (_) {
    return false
  }
}
