export interface User {
  id: number
  name: string
  username: string
  tag: number
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: number
      lng: number
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
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
