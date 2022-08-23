import type { Guild } from '../../types/datatypes';
import type { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import MemberList from '../../components/panels/member-section';
import TextArea from '../../components/panels/text-channel';
import ChannelHeader from '../../components/panels/channel-header';
import React from 'react';

interface Props {
	server: Guild
	messages: Array<any>
}


export default function HomePage({ server, messages }: Props) {
	const { data: session, status } = useSession();
	const loading = status === 'loading';
	console.log('server', server);
	console.log('message', messages);

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
			<div className="container-fluid" style={{ margin: 0, padding: 0 }}>
				<div className="row">
					<ServerSelector />
					<ChannelSelector server={server}/>
					<div className="col" style={{ maxWidth: 'calc(100vw - 328px)' }}>
						<ChannelHeader />
						<div className="row">
							<div style={{ width: 'calc(100vw - 590px)', minHeight: 'calc(100vh - 50px)', backgroundColor: 'var(--color-lighter-dark)', marginLeft: 12 }} >
								<TextArea />
							</div>
							{/* Member role*/}
							<MemberList />
						</div>
					</div>
				</div>
			</div>
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
