import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import TextSection from '../../components/panels/text-channel';
import MemberSection from '../../components/panels/member-section';
import type { Guild } from '../../types/datatypes';
import type { GetServerSidePropsContext } from 'next';

interface Props {
	server: Guild
	APIURL: string
	messages: Array<any>
}

function HomePage({ server, APIURL, messages }: Props) {
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
			<div className="container-fluid">
				<div className="row" style={{ height: '100vh' }}>
					<ServerSelector />
					<ChannelSelector guild={server} type="GUILD"/>
					<TextSection API={APIURL} messages={messages}/>
					<MemberSection guild={server}/>
				</div>
			</div>
		);

	}
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Fetch data from external API
	const res = await fetch(`${process.env.APIURL}/api/guilds/${context.params?.Id?.[0]}`);
	const data = await res.json();

	const mesdata = await fetch(`${process.env.APIURL}/api/channels/${context.params?.Id?.[1]}/messages`);
	const messages = await mesdata.json();
	// Pass data to the page via props
	return { props: { server: data, APIURL: process.env.APIURL, messages } };
}
export default HomePage;
