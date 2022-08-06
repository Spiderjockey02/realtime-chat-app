function Feed() {

	return (
		<div className="text-channel">
			<div className="text-input" style={{ 'white-space': 'nowrap' }}>
				<svg width="24" height="24" viewBox="0 0 24 24" className="icon-upload">
					<path fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path>
				</svg>
				<input type="text" placeholder="Message #{{CHANNEL.NAME}}" className="text-field" id="message"></input>
			</div>
		</div>
	);
}

export default Feed;
