import type { User } from './Users';

export enum ChannelTypes {
   GUILD_TEXT,
   GROUP_DM,
   GUILD_VOICE,
   CATEGORY,
   DM,
}

export type Channel = {
  id: string
  type: ChannelTypes,
  name: string
  topic?: string
  nsfw: boolean
  user_limit?: number
  rate_limit_per_user?: number
  recipients?: User[]
  owner_id?: string
  parentId?: string
  children: Channel[]
  permission_overwrites: PermissionOverWrite[]
}

export enum PermissionOverWritesTypes {
   ROLE,
   MEMBER
}

export type PermissionOverWrite = {
  id: string
  type: PermissionOverWritesTypes
  allow: number
  disallow: number
}