import { useSession } from 'next-auth/react';
import '@popperjs/core';
import ServerSelector from '../../components/panels/server-selector';
import ChannelSelector from '../../components/panels/channel-selector';
import TextSection from '../../components/panels/text-channel';
import MemberSection from '../../components/panels/member-section';

import React, { useState } from 'react';


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
					<ChannelSelector />
					<TextSection />
					<MemberSection />
				</div>
			</div>
		);

	}
}

export default HomePage;
