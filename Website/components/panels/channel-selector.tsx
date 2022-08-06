import type { Guild } from '../../types/datatypes';
import TextTab from '../tabs/text';
import VoiceTab from '../tabs/voice';
import CategoryTab from '../tabs/category';
interface Props {
	guild: Guild
}

function Feed({ guild }: Props) {
	console.log('data', guild);
	return (
		<div className="channel-selector">
			<ul>
				{guild.channels.filter(c => c.children?.length >= 1 || !c.parentId).map(i => {
					switch (i.type) {
						case 'TEXT':
							return (
								<li>
									<TextTab channel={i} guildID={guild.id} />
								</li>
							);
						case 'VOICE':
							return (
								<li>
									<VoiceTab channel={i} />
								</li>
							);
						default:
							return (
								<CategoryTab channel={i} guildID={guild.id} />
							);
					}
				})}
			</ul>
		</div>
	);
}

export default Feed;
