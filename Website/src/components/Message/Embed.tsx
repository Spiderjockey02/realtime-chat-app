import type { Embed } from '../../types/datatypes';

interface Props {
  embed: Embed
}

export default function Embed({ embed }: Props) {
	return (
		<div className="discord-embed">
			<div style={{ 'backgroundColor': 'green' }} className="discord-left-border"></div>
			<div className="discord-embed-container">
				<div className="discord-embed-content">
					<div>
						{embed.author
							? (
								<div className="discord-embed-author">
									{embed.author.icon_url ? <img src={embed.author.icon_url} alt="" className="discord-author-image" /> : ''}
									{embed.author.url
										? <a href={embed.author.url} target="_blank">{embed.author.name}</a>
										: <span>{embed.author.name}</span>
									}
								</div>
							)
							: ''
						}
						{embed.title
							? (
								<div className="discord-embed-title">
									{embed.url ? <a href={embed.url} target="_blank">{embed.title}</a> : <span>{embed.title}</span>}
								</div>
							)
							: ''
						}
						<div className="discord-embed-description">
							{embed.description}
						</div>
						<slot name="fields"></slot>
						{embed.image ? <img src={embed.image.url} alt="" className="discord-embed-image" /> : ''}
					</div>
					{embed.thumbnail ? <img src={embed.thumbnail.url} alt="" className="discord-embed-thumbnail" /> : ''}
				</div>
				{embed.footer || embed.timestamp
					? (
						<div className="discord-embed-footer">
							{embed.footer && embed.footer.icon_url ? <img src={embed.footer.icon_url} alt="" className="discord-footer-image" /> : ''}
							<span>
								<slot name="footer"></slot>
								{embed.footer && embed.timestamp ? <span className="discord-footer-separator">&bull;</span> : ''}
								{embed.timestamp ? <span>{embed.timestamp}</span> : ''}
							</span>
						</div>
					)
					: ''
				}
			</div>
		</div>
	);
}
