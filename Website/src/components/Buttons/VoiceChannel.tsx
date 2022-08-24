import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface Props {
  name: string
  active: boolean
}

export default function voiceChannel({ name, active }: Props) {

	// Render popup tooltip
	const renderTooltip = (props: string) => (
		<Tooltip id="button-tooltip">
			<h6 style={{ 'fontSize': '12px' }}>{props}</h6>
		</Tooltip>
	);

	return (
		<li className={`channelItem onselect ${active ? 'active' : ''}`}>
			<div className="icon">
				<svg className="icon-2W8DHg" aria-hidden="true" role="img" width={24} height={24} viewBox="0 0 24 24">
					<path
						fill="currentColor"
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
						aria-hidden="true"
					/>
				</svg>
			</div>
			<div className="text" style={{ fontSize: 14, paddingLeft: 5 }}>{name}</div>
			<div className="options">
				<OverlayTrigger placement="top" overlay={renderTooltip('Create Invite')}>
					<button className="catToggle" style={{ color: '#8d9196' }} aria-label="Create Invite" tabIndex={0} role="button">
						<svg className="actionIcon-2sw4Sl" aria-hidden="true" role="img" width={16} height={16} viewBox="0 0 16 16">
							<path fill="currentColor" d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z" />
							<path fill="currentColor" d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z"/>
							<path
								fill="currentColor"
								d="M6.5 8.34C3.26 8.34 1 9.98666 1 12.34V13.0067H12V12.34C12 9.98 9.74 8.34 6.5 8.34Z"
							/>
						</svg>
					</button>
				</OverlayTrigger>
				<OverlayTrigger placement="top" overlay={renderTooltip('Edit channel')}>
					<button className="catToggle" style={{ color: '#8d9196' }} tabIndex={0} aria-label="Edit Channel" role="button">
						<svg className="actionIcon-2sw4Sl" aria-hidden="true" role="img" width={16} height={16} viewBox="0 0 16 16">
							<path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14 7V9C14 9 12.5867 9 12.5733 9.00667C12.42 9.58667 12.1733 10.1267 11.84 10.6067L12.74 11.5067L11.4933 12.7533L10.5933 11.8533C10.1133 12.1867 9.57334 12.44 8.99334 12.5867V14H6.99334V12.58C6.41334 12.4333 5.87334 12.18 5.39334 11.8467L4.49333 12.7467L3.24667 11.5L4.14667 10.6C3.81333 10.1267 3.56 9.58 3.41333 9H2V7H3.41333C3.56 6.42 3.81333 5.88 4.14667 5.4L3.24667 4.5L4.5 3.24667L5.4 4.14667C5.87334 3.81333 6.42 3.56 7 3.41333V2H9V3.41333C9.58 3.56667 10.12 3.81333 10.6 4.14667L11.5067 3.25333L12.7533 4.5L11.8533 5.4C12.1867 5.87334 12.44 6.42 12.5867 7H14ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"/>
						</svg>
					</button>
				</OverlayTrigger>
			</div>
		</li>
	);
}
