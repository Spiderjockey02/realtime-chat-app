import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const data = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/session`);
const res = await data.json();

const socket = io(`${process.env.NEXT_PUBLIC_APIURL}`, {
	withCredentials: true,
	query: { token: res.token },
});
const SocketContext = createContext<Socket>(socket);

socket.on('connect', () => {
	console.log('connected to socket');
});

setInterval(() => {
	const start = new Date().getMilliseconds();
	socket.emit('ping', () => {
		const end = new Date();
		console.log(`${end.toTimeString().split(' ')[0]} [EVENT]: ping	-	${end.getMilliseconds() - start}ms`);
	});
}, 10000);

const SocketProvider = ({ children }: any) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
export { SocketContext, SocketProvider };

export function getServerSideProps() {
	console.log('boo');
}
