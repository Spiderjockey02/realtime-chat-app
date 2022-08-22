import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../../public/css/server.css';
import '../../public/css/main.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => require('bootstrap/dist/js/bootstrap'));

	return (
		<SessionProvider session={session}>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
