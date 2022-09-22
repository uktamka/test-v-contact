import { ApiQuery, Tag } from 'src/types'
import { AxiosReqConfig, api } from 'boot/axios'

export const getTags = async (
  params?: ApiQuery,
  options?: AxiosReqConfig
): Promise<Array<Tag>> => {
  try {
    const { data } = await api.get('/tags', { ...options, params })
    return data
  } catch (_) {
    return []
  }
}

export const createTag = async (
  tag: Omit<Tag, 'id'>,
  options?: AxiosReqConfig
): Promise<Tag | boolean> => {
  try {
    const { data } = await api.post('/tags', tag, options)
    return data
  } catch (_) {
    return false
  }
}

export const editTag = async (tag: Partial<Tag>, options?: AxiosReqConfig) => {
  try {
    const { id } = tag
    delete tag.id
    const { data } = await api.patch(`/tags/${id}`, tag, options)
    return data
  } catch (_) {
    return false
  }
}

export const deleteTag = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/tags/${id}`)
    return true
  } catch (_) {
    return false
  }
}
