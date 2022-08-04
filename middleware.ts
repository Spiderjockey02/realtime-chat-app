import { getSession } from 'next-auth/react';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

	// channels endpoint is the only protected URL currently
	if (req.nextUrl.pathname.startsWith('/channels')) {
		// Make sure the person is logged in
		const requestForNextAuth = {
			headers: {
				cookie: req.headers.get('cookie'),
			},
		};
		const session = await getSession({ req: requestForNextAuth });
		// const session = await unstable_getServerSession(req);

		if (!session) return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);

		// Check if they have permission to be in that guild (could be @me which would be home page for user)
		const guildId = req.nextUrl.pathname.split('/')[2];
		if (guildId !== '@me') {
			const res = await fetch('http://192.168.0.14:3000/api/guilds/cl68eygov0061n0uvm7baw99y');
			const guildData = await res.json();

			// User has joined the server meaning they have permssion to see it
			if (guildData.users.includes(session.id)) {

				// Check if they have permission to be in the channel
				const channel = req.nextUrl.pathname.split('/')[3];
				if (channel) {
					const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/channels/${req.nextUrl.pathname.split('/')[3]}`);
					const channelData = res.json();

					if (!channelData.members.includes(session.id)) {
						NextResponse.redirect(`${process.env.NEXTAUTH_URL}/channels/${guildId}/${guildData.mainChannel}`);
					}
				} else {
					NextResponse.redirect(`${process.env.NEXTAUTH_URL}/channels/${guildId}/${guildData.mainChannel}`);
				}
			}
		}

	}

	// If user is authenticated, continue.
	return NextResponse.next();
}
