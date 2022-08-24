import Author from './Author';
import Embed from './Embed';
import type { Message } from '../../types/datatypes';

interface Props {
  message: Message
}

export default function defaultMessage({ message }: Props) {
	return (
		<div className="discord-message">
			<div className="discord-author-avatar">
				<img src={message.author.avatar ?? 'https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32'} alt={`${message.author.username}`} />
			</div>
			<div className="discord-message-content">
				<Author user={message.author} />
				<span className="discord-message-timestamp">{message.createdAt}</span>
				<div className="discord-message-body">
					<slot>{message.text}</slot>
				</div>
				{message.embeds.map(e => (
					<Embed embed={e}/>
				))}
			</div>
		</div>
	);
}
