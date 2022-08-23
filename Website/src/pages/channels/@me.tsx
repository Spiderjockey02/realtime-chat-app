import { useSession } from 'next-auth/react';
import ServerSelector from '../../components/panels/server-selector';
import DMSelector from '../../components/panels/DM-selector';
import FriendTab from '../../components/panels/friend-tab';
import ActiveNow from '../../components/panels/active-now';
import FriendHeader from '../../components/panels/friend-header';
import React from 'react';


export default function HomePage() {
	const { data: session, status } = useSession();
	const loading = status === 'loading';

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
					<DMSelector />
					<div className="col" style={{ maxWidth: 'calc(100vw - 328px)' }}>
						<FriendHeader />
						<div className="row">
							<div style={{ width: 'calc(100vw - 590px)', minHeight: 'calc(100vh - 50px)', backgroundColor: 'var(--color-lighter-dark)', marginLeft: 12 }} >
								<FriendTab />
							</div>
							{/* Member role*/}
							<ActiveNow />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
