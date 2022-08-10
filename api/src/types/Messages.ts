import type { User } from './Users';
import type { Embed } from './Embeds';
import type { Role } from './Roles';
import type { Channel } from './Channels';
import type { Emoji } from './Emoji';

export type Message = {
  id: string
  channel_id: string
  author: User
  content: string
  timestamp: string
  edited_timestamp: string
  tts: boolean
  mention_everyone: boolean
  mentions: User[]
  mentions_roles: Role[]
  mention_channels: Channel[]
  attachments: MessageAttachment[]
  embeds: Embed[]
  reactions: MessageReaction[]
  pinned: boolean

}

export type MessageReaction = {
  count: number
  me: boolean
  emoji: Emoji
}

export type MessageAttachment = {
  id: string
  filename: string
  description?: string
  content_type: string
  size: number
  url: string
  height?: number
  width?: number
}
