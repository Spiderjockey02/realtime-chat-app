interface Props {
	guild: Array<any>
}

function Feed({ data }) {
	console.log('data', data);

	return (
		<div className="channel-selector">
			{data && data.map(i => (
				<p>{i.name}</p>
			))}
		</div>
	);
}

export default Feed;
