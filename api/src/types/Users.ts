export type User = {
  id: string
  username: string
  discriminator: string
  avatar?: string
  bot?: boolean
  system?: boolean
  verified?: boolean
  email: string
}
