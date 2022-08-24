import { useSession } from 'next-auth/react';
import type { Channel, Message } from '../../types/datatypes';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../socketio';
import DefaultMessage from '../Message/defaultMessage';

interface Props {
	channel: Channel
	messages: Message[]
}

function Feed({ channel, messages }: Props) {
	const { data: session } = useSession();

	const socket = useContext(SocketContext);
	const [msg, setmsg] = useState<Message[]>(messages);


	useEffect(() => {
		socket.on('messages', (m: Message[]) => {
			setmsg(p => [...p, ...m]);
		});
	}, [setmsg, setmsg]);

	async function handleInput(event) {
		// If the user presses the "Enter" key on the keyboard
		if (event.key === 'Enter') {
			// Send message
			const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/channels/${channel.id}/messages`, {
				method: 'post',
				headers: {
					'content-type': 'application/json;charset=UTF-8',
				},
				body: JSON.stringify({
					message: event.target.value,
					userId: session?.id,
				}),
			});
			event.target.value = '';
		}
	}
	console.log(msg);
	return (
		<div className="message-container">
			{/* Messages start here*/}
			<div className="discord-messages">
				<h1>
					<strong>Welcome to #{channel.name}</strong>
				</h1>
				<p>This is the start of the #general channel</p>
				{msg.map(m => (
					<DefaultMessage message={m}/>
				))}
			</div>
			<div className="text-input" style={{ whiteSpace: 'nowrap' }}>
				<svg
					className="icon-upload"
					aria-hidden="true"
					role="img"
					width={32}
					height={32}
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"
					/>
				</svg>
				<textarea
					placeholder="Message #{{CHANNEL.NAME}}"
					className="text-field"
					id="message"
					name="message"
					autoComplete="off"
					defaultValue={''}
					onKeyPress={handleInput}
				/>
			</div>
		</div>
	);
}

export default Feed;
