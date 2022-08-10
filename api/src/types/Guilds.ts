import type { Role } from './Roles';
import type { Channel } from './Channels';
import type { Emoji } from './Emoji';
import type { GuildMember } from './GuildMember';

export type Guild = {
  id: string
  name: string
  createdAt: Date
  icon?: string
  owner: boolean
  ownerId: string
  roles: Role[]
  emojis: Emoji[]
  channels: Channel[]
  member: GuildMember[]
}
