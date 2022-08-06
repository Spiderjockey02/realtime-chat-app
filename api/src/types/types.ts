export type Channel = {
  id: string
  name: string
  type: 'TEXT' | 'DM' | 'GROUP_DM'| 'VOICE' | 'CATEGORY'
  topic?: string
  nsfw: boolean
  user_limit?: number
  rate_limit_per_user?: number
  recipients?: User[]
  owner_id?: string
  parentId?: string
  children: Channel[]
}


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
