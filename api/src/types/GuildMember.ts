import type { User } from './Users';
import type { Role } from './Roles';

export type GuildMember = {
  id: string
  user: User
  roles: Role[]
  joined_at: string
  deaf: boolean
  mute: boolean
}
