import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import DMSelector from '../../components/panels/DM-selector';
import FriendTab from '../../components/panels/friend-tab';
import ActiveNow from '../../components/panels/active-now';

import React from 'react';


function HomePage() {
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
			<div className="container-fluid">
				<div className="row" style={{ height: '100vh' }}>
					<ServerSelector />
					<DMSelector />
					<FriendTab />
					<ActiveNow />
				</div>
			</div>
		);

	}
}


export default HomePage;
