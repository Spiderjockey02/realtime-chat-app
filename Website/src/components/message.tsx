import {
	DiscordMessages,
	DiscordMention,
	DiscordMessage,
} from '@danktuary/react-discord-message';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './socketio';

type Post = {
	text: string;
	author: {
		username: string;
	};
};

function message() {
	const [posts, setPosts] = useState<Post[]>([]);
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.on('messages', (m: Post[]) => {
			setPosts((p) => [...p, ...m]);
		});
	}, [posts, setPosts]);

	return (
		<DiscordMessages className={{ height: '85vh' }}>
			<div id="messages">
				{posts
					.filter((p) => p.text)
					.map((msg, index) => (
						<DiscordMessage
							author={msg.author.username}
							avatar="red"
							key={index}
						>
							{msg.text} <DiscordMention> Boo </DiscordMention>
						</DiscordMessage>
					))}
			</div>
		</DiscordMessages>
	);
}

export default message;
