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
			console.log(`${process.env.APIURL}/api/guilds/${guildId}`);
			const res = await fetch(`${process.env.APIURL}/api/guilds/${guildId}`, {
				headers: {
					'content-type': 'application/json;charset=UTF-8',
				},
			});
			const guildData = await res.json();

			// User has joined the server meaning they have permssion to see it
			if (guildData.members.find(m => session.id == m.userId)) {

				// Check if they have permission to be in the channel
				/*
				const channel = req.nextUrl.pathname.split('/')[3];
				if (channel) {
					const res2 = await fetch(`${process.env.APIURL}/api/channels/${req.nextUrl.pathname.split('/')[3]}`);
					const channelData = await res2.json();
					console.log(channelData);
					if (!channelData.members.includes(session.id)) {
						NextResponse.redirect(`${process.env.NEXTAUTH_URL}/channels/${guildId}/${guildData.mainChannel}`);
					}
				} else {
					NextResponse.redirect(`${process.env.NEXTAUTH_URL}/channels/${guildId}/${guildData.mainChannel}`);
				}
				*/
			}
		}

	}

	// If user is authenticated, continue.
	return NextResponse.next();
}
