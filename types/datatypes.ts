export type Guild = {
  name: string
  createdAt: Date
  icon?: string
  id: string
  ownerId: string
  roles: Role[]
  users: User[]
  channels: Channel[]
}

export type Role = {
  id: string
  name: string
}

export type User = {
  id: string
  username: string
}

export type Channel = {
  id: string
  name: string
}
