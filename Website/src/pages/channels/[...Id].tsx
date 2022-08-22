import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import TextSection from '../../components/panels/text-channel';
import MemberSection from '../../components/panels/member-section';
import type { Guild } from '../../types/datatypes';
import type { GetServerSidePropsContext } from 'next';
import { SocketProvider } from '../../components/socketio';

interface Props {
	server: Guild
	messages: Array<any>
}

function HomePage({ server, messages }: Props) {
	const { data: session, status } = useSession();
	const loading = status === 'loading';


	if (typeof window !== 'undefined' && loading) return null;

	// When rendering client side don't display anything until loading is complete
	if (!session) {
		return (
			<div>
				<p>Access Denied</p>
			</div>
		);
	} else {
		return (
			<SocketProvider>
				<div className="container-fluid custom-scrollbar">
					<div className="row" style={{ height: '100vh' }}>
						<ServerSelector />
						<ChannelSelector guild={server} />
						<TextSection messages={messages}/>
						<MemberSection guild={server}/>
					</div>
				</div>
			</SocketProvider>
		);

	}
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Fetch data from external API
	const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/guilds/${context.params?.Id?.[0]}`);
	const data = await res.json();

	const mesdata = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/channels/${context.params?.Id?.[1]}/messages`);
	const messages = await mesdata.json();
	// Pass data to the page via props
	return { props: { server: data, messages } };
}
export default HomePage;
