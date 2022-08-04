import type { Guild } from '../../types/datatypes';

interface Props {
	guild: Guild
	type: 'GUILD' | 'DM'
}

function Feed({ type, guild }: Props) {
	console.log('data', guild);

	switch (type) {
		case 'GUILD':
			return (
				<div className="channel-selector">
					{guild.channels.map(i => (
						<p>{i.name}</p>
					))}
				</div>
			);
		case 'DM':
			return (
				<div className="channel-selector">
					<p>Friends</p>
				</div>
			);
		default:
			return (
				<div className="channel-selector">
					<h1>An error has occured</h1>
				</div>
			);
	}
}

export default Feed;
