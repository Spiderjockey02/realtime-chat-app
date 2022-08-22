import type { Guild } from '../../types/datatypes';

interface Props {
	guild: Guild
}


function Feed() {

	return (
		<nav style={{ width: 232 }}>
			<ul className="channels-container">
				<li>
					<h6>Owner - 1</h6>
				</li>
				{/* Online*/}
				<li className="channelItem onselect">
					<div
						className="ml onselect"
						style={{ display: 'flex', flexDirection: 'row', height: 42 }}
					>
						<div className="avatar-wrapper">
							<img
								className="avatar"
								src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
								alt=""
							/>
							<div
								className="status-holder"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title="Online"
							>
								<div className="user-status-icon-online" />
							</div>
						</div>
						<div>
							I am Ben
							<p className="text-truncate" style={{ maxWidth: 145 }}>
								https://discord.gg/8g6zUQu
							</p>
						</div>
					</div>
				</li>
				{/* Offline*/}
				<li className="channelItem onselect">
					<div
						className="ml onselect"
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: 42,
							alignItems: 'center',
						}}
					>
						<div className="avatar-wrapper">
							<img
								className="avatar"
								src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
								alt=""
							/>
						</div>
						<div>I am Ben</div>
					</div>
				</li>
				{/* Idle*/}
				<li className="channelItem onselect">
					<div
						className="ml onselect"
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: 42,
							alignItems: 'center',
						}}
					>
						<div className="avatar-wrapper">
							<img
								className="avatar"
								src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
								alt=""
							/>
							<div className="status-holder">
								<div className="user-status-icon-idle" />
							</div>
						</div>
						<div>
							I am Ben
							<p className="text-truncate" style={{ maxWidth: 145 }}>
								https://discord.gg/8g6zUQu
							</p>
						</div>
					</div>
				</li>
				{/* DnD*/}
				<li className="channelItem onselect">
					<div
						className="ml onselect"
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: 42,
							alignItems: 'center',
						}}
					>
						<div className="avatar-wrapper">
							<img
								className="avatar"
								src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
								alt=""
							/>
							<div className="status-holder">
								<div className="user-status-icon-DnD" />
							</div>
						</div>
						<div>
							I am Ben
							<p className="text-truncate" style={{ maxWidth: 145 }}>
								https://discord.gg/8g6zUQu
							</p>
						</div>
					</div>
				</li>
			</ul>
			<h4>Offline - 32</h4>
		</nav>
	);
}

export default Feed;
