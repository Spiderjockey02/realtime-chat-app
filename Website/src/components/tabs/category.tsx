import type { Channel } from '../../types/datatypes';
import TextTab from './text';
import VoiceTab from './voice';

interface Props {
	channel: Channel
  guildID: string
}

function Text({ channel, guildID }: Props) {
	return (
		<li>
			<div className="container">
				<button type="button" className="btn btn-info" data-toggle="collapse" data-target={`#demo-${channel.id}`}>Simple collapsible</button>
				<div id={`demo-${channel.id}`} className="collapse">
					{channel.children.map(i => {
						switch (i.type) {
							case 'TEXT':
								return (
									<TextTab channel={i} guildID={guildID} />
								);
							case 'VOICE':
								return (
									<VoiceTab channel={i} />
								);
						}
					})}
				</div>
			</div>
		</li>
	);
}

export default Text;
