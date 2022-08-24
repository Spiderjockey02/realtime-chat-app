import type { Guild, Channel } from '../../types/datatypes';
import TextChannel from '../Buttons/TextChannel';
import VoiceChannel from '../Buttons/VoiceChannel';
import CategoryChannel from '../Buttons/CategoryChannel';

interface Props {
	server: Guild
	activeChannel: Channel
}

function getChannelButton(channel: Channel, activeChannel: Channel) {
	switch (channel.type) {
		case 'TEXT':
			return (
				<TextChannel name={channel.name} active={channel.id == activeChannel.id}/>
			);
		case 'VOICE':
			return (
				<VoiceChannel name={channel.name} active={channel.id == activeChannel.id}/>
			);
		case 'CATEGORY':
			return (
				<CategoryChannel name={channel.name}/>
			);
	}
}


function Feed({ server, activeChannel }: Props) {
	return (
		<nav className="col" style={{ maxWidth: '256px', maxHeight: '100vh' }}>
			<div className="dropdown" style={{ borderBottom: '1px solid black' }}>
				<button
					className="catToggle dropdown-toggle"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					style={{ 'width': '100%' }}
				>
					{server.name}
				</button>
				<ul
					className="dropdown-menu dropdown-menu-center"
					aria-labelledby="dropdownMenuButton1"
				>
					<li className="serverDropdown purple-boi">
						<a className="dropdown-item" href="#">
							Server Boost
						</a>
						<svg
							className="icon-E4cW1l"
							aria-hidden="true"
							role="img"
							width={24}
							height={24}
							viewBox="0 0 8 12"
						>
							<path
								d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z"
								fill="#ff73fa"
							/>
							<path
								d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z"
								fill="#ff73fa"
							/>
						</svg>
					</li>
					<li className="small-divider" />
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Invite People
						</a>
					</li>
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Server Settings
						</a>
					</li>
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Create Channel
						</a>
					</li>
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Create category
						</a>
					</li>
					<li className="small-divider" />
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Notifications Settings
						</a>
					</li>
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Privacy Settings
						</a>
					</li>
					<li className="small-divider" />
					<li className="serverDropdown">
						<a className="dropdown-item purple-boi" href="#">
							Edit Server profile
						</a>
					</li>
					<li className="serverDropdown">
						<a className="dropdown-item bad-boi text-danger" href="#">
							Leave server
						</a>
					</li>
				</ul>
			</div>
			<ul className="channels-container" style={{ 'maxWidth': '256px' }}>
				{server.channels.sort((a, b) => a.position - b.position).map(c => (
					getChannelButton(c, activeChannel)
				))}

				<li className="channelItem collapse onselect" id="collapseExample">
					<div className="icon">
						<svg
							width={24}
							height={24}
							viewBox="0 0 24 24"
							className="icon-2W8DHg"
						>
							<path
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M15 12C15 12.0007 15 12.0013 15 12.002C15 12.553 14.551 13.002 14 13.002V15.002C15.654 15.002 17 13.657 17 12.002C17 12.0013 17 12.0007 17 12H15ZM19 12C19 12.0007 19 12.0013 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 12.0013 21 12.0007 21 12H19ZM10.293 3.29604C10.579 3.01004 11.009 2.92504 11.383 3.07904C11.757 3.23204 12 3.59904 12 4.00204V20.002C12 20.407 11.757 20.772 11.383 20.927C11.009 21.082 10.579 20.996 10.293 20.71L6 16.002H3C2.45 16.002 2 15.552 2 15.002V9.00204C2 8.45304 2.45 8.00204 3 8.00204H6L10.293 3.29604Z"
							/>
							<path
								fill="currentColor"
								d="M21.025 5V4C21.025 2.88 20.05 2 19 2C17.95 2 17 2.88 17 4V5C16.4477 5 16 5.44772 16 6V9C16 9.55228 16.4477 10 17 10H19H21C21.5523 10 22 9.55228 22 9V5.975C22 5.43652 21.5635 5 21.025 5ZM20 5H18V4C18 3.42857 18.4667 3 19 3C19.5333 3 20 3.42857 20 4V5Z"
							/>
						</svg>
					</div>
					<div className="text">Private VOICE</div>
					<div className="options">
						<div
							className="iconItem-1EjiK0 iconBase-2G48Fc"
							aria-label="Create Invite"
							tabIndex={0}
							role="button"
						>
							<svg
								className="actionIcon-2sw4Sl"
								aria-hidden="true"
								role="img"
								width={16}
								height={16}
								viewBox="0 0 16 16"
							>
								<path
									fill="currentColor"
									d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z"
								/>
								<path
									fill="currentColor"
									d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z"
								/>
								<path
									fill="currentColor"
									d="M6.5 8.34C3.26 8.34 1 9.98666 1 12.34V13.0067H12V12.34C12 9.98 9.74 8.34 6.5 8.34Z"
								/>
							</svg>
						</div>
						<div
							className="iconItem-1EjiK0 iconBase-2G48Fc"
							tabIndex={0}
							aria-label="Edit Channel"
							role="button"
						>
							<svg
								className="actionIcon-2sw4Sl"
								aria-hidden="true"
								role="img"
								width={16}
								height={16}
								viewBox="0 0 16 16"
							>
								<path
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14 7V9C14 9 12.5867 9 12.5733 9.00667C12.42 9.58667 12.1733 10.1267 11.84 10.6067L12.74 11.5067L11.4933 12.7533L10.5933 11.8533C10.1133 12.1867 9.57334 12.44 8.99334 12.5867V14H6.99334V12.58C6.41334 12.4333 5.87334 12.18 5.39334 11.8467L4.49333 12.7467L3.24667 11.5L4.14667 10.6C3.81333 10.1267 3.56 9.58 3.41333 9H2V7H3.41333C3.56 6.42 3.81333 5.88 4.14667 5.4L3.24667 4.5L4.5 3.24667L5.4 4.14667C5.87334 3.81333 6.42 3.56 7 3.41333V2H9V3.41333C9.58 3.56667 10.12 3.81333 10.6 4.14667L11.5067 3.25333L12.7533 4.5L11.8533 5.4C12.1867 5.87334 12.44 6.42 12.5867 7H14ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
								/>
							</svg>
						</div>
					</div>
				</li>
			</ul>
			{/* User account type*/}
			<section className="panel">
				<div className="user-info">
					<div className="avatar-wrapper">
						<img
							className="avatar"
							src="https://cdn.discordapp.com/avatars/184376969016639488/755ecb6fe3bfd7a2918c6fc330a4b858.webp?size=32"
							alt=""
						/>
						<div className="status-holder">
							<div className="user-status-icon" />
						</div>
					</div>
					<div className="name-tag-container">
						<h1
							className="username"
							data-bs-toggle="tooltip"
							data-bs-placement="top"
							title="Click to copy username"
						>
							I am Ben
						</h1>
						<div className="roller">
							<p className="status-emoji">👨‍💻</p>
							<p className="tag">#8100</p>
						</div>
					</div>
				</div>
				<div className="button-container">
					<button
						className="switcher"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Unmute"
						onclick="toggleMute()"
					>
						<svg
							aria-hidden="true"
							role="img"
							width={20}
							height={20}
							viewBox="0 0 24 24"
							id="muteIcon"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
								fill="currentColor"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
								fill="currentColor"
							/>
							<path
								fill="red"
								d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
								className="strikethrough-2Kl6HF"
								id="cross"
							></path>
						</svg>
					</button>
					<button
						className="switcher"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Deafen"
						onclick="toggleDeafen()"
					>
						<svg width={24} height={24} viewBox="0 0 24 24" id="deafIcon">
							<path
								d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
								fill="currentColor"
							/>
							<path
								fill="red"
								d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z"
								className="strikethrough-2Kl6HF"
								id="cross"
							/>
						</svg>
					</button>
					<button className="switcher tipper-boi" data-tip="User Settings">
						<svg aria-hidden="false" width={20} height={20} viewBox="0 0 24 24">
							<path
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
							/>
						</svg>
					</button>
				</div>
			</section>
		</nav>
	);
}

export default Feed;
