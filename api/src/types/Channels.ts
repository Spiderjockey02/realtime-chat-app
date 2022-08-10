import type { User } from './Users';

export enum channelTypeEnum {
  'GUILD_TEXT',
  'DM',
  'GROUP_DM',
  'VOICE',
  'CATEGORY'
}

export type Channel = {
  id: string
  type: channelTypeEnum
  name: string
  topic?: string
  nsfw: boolean
  user_limit?: number
  rate_limit_per_user?: number
  recipients?: User[]
  owner_id?: string
  parentId?: string
  children: Channel[]
  permission_overwrites: PermOverwrites[]
}

export enum OverwriteType {
  'role',
  'member'
}

export type PermOverwrites = {
  id: string
  type: OverwriteType
  allow: number
  disallow: number
}
