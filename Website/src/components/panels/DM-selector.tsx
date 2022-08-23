export default function DMSelector() {
	return (
		<nav className="col" style={{ maxWidth: '256px', maxHeight: '100vh' }}>
			<div style={{ borderBottom: '1px solid black', height: '49px' }}>
				<p>Friends</p>
			</div>
			<ul className="channels-container" style={{ 'maxWidth': '256px' }}>
				<h6>Direct messages</h6>
				<li className="channelItem onselect active">
					<p>Coming soon</p>
				</li>
			</ul>
		</nav>
	);
}
