import Link from 'next/link';

interface Props {
  guild: {
    id: string
    icon: string
    nameAcronym: string
  }
}

function Feed({ guild }: Props) {
	return (
		<Link href={`/channels/${guild.id}/1`}>
			<a style={{ margin: '0px' }}>
				<div className="server-icon-bg" data-toggle="tooltip" data-placement="right" title="{guild.name}">
					{(guild.icon) ?
						<img src="https://cdn.discordapp.com/icons/489449496527503390/fa0f0e4cf2830aa8444ddb4c329b5162.webp?size=96" className="rounded-circle" data-toggle="tooltip" data-placement="right" title="<%= guild.name %>" />
						: <span className="server-icon-text">
						STV { guild.nameAcronym }
						</span>
					}
				</div>
			</a>
		</Link>
	);
}

export default Feed;
