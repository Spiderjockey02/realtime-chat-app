import type { Guild } from '../../types/datatypes';

interface Props {
	guild: Guild
}


function Feed({ guild }: Props) {

	return (
		<div className="member-section">
			{guild.users.map(i => (
				<p>{i.username}</p>
			))}
		</div>
	);
}

export default Feed;
