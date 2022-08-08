import 'bootstrap/dist/css/bootstrap.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	console.log(pageProps);
	return (
		<SessionProvider session={session}>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
