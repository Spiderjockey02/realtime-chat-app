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
