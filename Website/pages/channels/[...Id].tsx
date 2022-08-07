import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import TextSection from '../../components/panels/text-channel';
import MemberSection from '../../components/panels/member-section';
import type { Guild } from '../../types/datatypes';
import type { GetServerSidePropsContext } from 'next';
import io from 'socket.io-client';
import { useEffect } from 'react';

interface Props {
	server: Guild
	APIURL: string
}

function HomePage({ server, APIURL }: Props) {
	const { data: session, status } = useSession();
	const loading = status === 'loading';

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		const socket = io(APIURL, {
			withCredentials: true,
			extraHeaders: {
				'my-custom-header': 'abcd',
			},
		});

		setInterval(() => {
			const start = Date.now();
			socket.emit('ping', () => {
				const end = new Date();
				console.log(`${end.toTimeString().split(' ')[0]} [EVENT]: ping	-	${end - start}ms`);
			});
		}, 10000);
	};

	// When rendering client side don't display anything until loading is complete
	if (typeof window !== 'undefined' && loading) return null;
	if (!session) {
		return (
			<div>
				<p>Access Denied</p>
			</div>
		);
	} else {
		return (
			<div className="container-fluid">
				<div className="row" style={{ height: '100vh' }}>
					<ServerSelector />
					<ChannelSelector guild={server} type="GUILD"/>
					<TextSection />
					<MemberSection guild={server}/>
				</div>
			</div>
		);

	}
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Fetch data from external API
	console.log(process.env.APIURL);
	const res = await fetch(`${process.env.APIURL}/api/guilds/${context.params?.Id?.[0]}`);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { server: data, APIURL: process.env.APIURL } };
}
export default HomePage;
