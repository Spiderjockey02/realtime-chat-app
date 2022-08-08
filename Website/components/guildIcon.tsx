import Link from 'next/link';

interface Props {
  guild: {
    guildId: string
    icon: string
    nameAcronym: string
    channel: any
  }
}

function Feed({ guild }: Props) {
	console.log('guild', guild);
	return (
		<Link href={`/channels/${guild.guildId}/${guild.guild.channels.find(c => c.position == 0).id}`}>
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
