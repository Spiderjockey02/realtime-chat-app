import type { GetServerSidePropsContext } from 'next';
import Message from '../message';

function Feed({ messages }: Props) {

	async function handleInput(event) {
		// If the user presses the "Enter" key on the keyboard
		if (event.key === 'Enter') {
			// Send message
			const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/channels/cl6jv5c8w0244zcuv6z2odxj3/messages`, {
				method: 'post',
				headers: {
					'content-type': 'application/json;charset=UTF-8',
				},
				body: JSON.stringify({
					message: event.target.value,
					code: '100',
				}),
			});
			event.target.value = '';
		}
	}

	return (
		<div className="message-container">
			{/* Messages start here*/}
			<div className="discord-messages">
				<div className="discord-message">
					<div className="discord-embed">
						<div
							style={{ backgroundColor: 'green' }}
							className="discord-left-border"
						/>
						<div className="discord-embed-container">
							<div className="discord-embed-content">
								<div>
									<div className="discord-embed-author">
										<img
											src="{this.authorImage}"
											alt=""
											className="discord-author-image"
										/>
										<a href="{this.authorUrl}" target="_blank">
											{'{'}this.authorName{'}'}
										</a>
									</div>
									<div className="discord-embed-title">
										<a href="{this.url}" target="_blank">
											{'{'}this.embedTitle{'}'}
										</a>
									</div>
									<div className="discord-embed-description">
										<slot />
									</div>
									<slot name="fields" />
									<img
										src="{this.image}"
										alt=""
										className="discord-embed-image"
									/>
								</div>
								<img
									src="{this.thumbnail}"
									alt=""
									className="discord-embed-thumbnail"
								/>
							</div>
							<div className="discord-embed-footer">
								<img
									src="{this.footerImage}"
									alt=""
									className="discord-footer-image"
								/>
								<span>
									<slot name="footer" />
									<span className="discord-footer-separator">•</span>
									<span>
										{'{'}this.timestamp{'}'}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="discord-message">
					<div className="discord-author-avatar">
						<img
							src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
							alt="{profile.author}"
						/>
					</div>
					<div className="discord-message-content">
						<div>
							<span className="discord-author-info">
								<span
									className="discord-author-username"
									style={{ color: 'red' }}
								>
									I am Ben
								</span>
								<span className="discord-bot-tag">Bot</span>
							</span>
							<span className="discord-message-timestamp">
								Today at 01:45
							</span>
						</div>
						<div className="discord-message-body">
							Hello
							<span className="discord-message-edited">(edited)</span>
						</div>
						<slot name="embeds" />
					</div>
				</div>
			</div>
			<p>This is the start of the #general channel</p>
			<h1>
				<strong>Welcome to #general</strong>
			</h1>
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
				/>
			</div>
		</div>
	);
}

export default Feed;
