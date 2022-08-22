import { DiscordMessages, DiscordMention, DiscordMessage } from '@danktuary/react-discord-message';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './socketio';

interface Props {
  messages: Post[]
}

type Post = {
  text: string
  author: {
    username: string
  }
}

function message({ messages }: Props) {
	const [posts, setPosts] = useState<Post[]>(messages);
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.on('messages', (m: Post[]) => {
			setPosts(p => [...p, ...m]);
		});
	}, [posts, setPosts]);

	return (
		<DiscordMessages>
			<div style={{ 'height': '85vh', 'overflow':'scroll', 'display': 'flex', 'flexDirection': 'column-reverse' }}>
				{posts.filter(p => p.text).map((msg, index) => (
					<DiscordMessage author={msg.author.username} avatar="red" key={index}>
						{msg.text} <DiscordMention> Boo </DiscordMention>
					</DiscordMessage>
				))}
			</div>
		</DiscordMessages>

	);
}

export default message;
