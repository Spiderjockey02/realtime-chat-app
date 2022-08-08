import React, { createContext, PropsWithChildren } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io(`${process.env.NEXTAUTH_URL}:3001`, {
	withCredentials: true,
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
});
const SocketContext = createContext<Socket>(socket);

socket.on('connect', () => {
	console.log('connected to socket');
});

setInterval(() => {
	const start = new Date().getMilliseconds();
	socket.emit('ping', () => {
		const end = new Date();
		console.log(
			`${end.toTimeString().split(' ')[0]} [EVENT]: ping	-	${
				end.getMilliseconds() - start
			}ms`,
		);
	});
}, 10000);

const SocketProvider = ({ children }: PropsWithChildren) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
export { SocketContext, SocketProvider };
