export interface User {
  id: number
  name: string
  username: string
  tag: number
  email: string
  address: {
    city: string
    street: string
    suite: string
  }
  phone: string
}

export interface Tag {
  id: number
  name: string
}

export interface ApiQuery {
  _sort?: string
  _order?: string
  _page?: number
  _start?: number
  _end?: number
  _limit?: number
  id?: number
  q?: string
}
