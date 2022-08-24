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

export type Message = {
  author: User
  authorId: string
  channelId: string
  createdAt: Date
  id: string
  text: string
  embeds: Array<object>
}

export type User = {
  avatar?: string
  bot?: boolean
  createdAt: string
  discriminator: string
  email: string
  id: string
  username: string
  system?: boolean
  verified?: boolean
}


export type Channel = {
  id: string
  name: string
  type: 'TEXT' | 'VOICE' | 'CATEGORY'
  position: number
  topic: string
  children: Channel[]
  parentId?: string
}

export type Embed = {
  title: string
  description: string
  url: string
  timestamp: string
  color: number
  footer: EmbedFooter
  image: EmbedImage
  thumbnail: EmbedImage
  author: EmbedAuthor
  fields: EmbedFields[]
}

type EmbedFooter = {
  text: string
  icon_url?: string
}

type EmbedImage = {
  url: string
  height: number
  width: string
}

type EmbedAuthor = {
  name: string
  url?: string
  icon_url?: string
}

type EmbedFields = {
  name: string
  value: string
  inline?: string
}
