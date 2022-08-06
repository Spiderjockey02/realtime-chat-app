import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/main.css';
import '../public/css/discord.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
		import('bootstrap/dist/js/bootstrap');
	}, []);

	return (
		<SessionProvider session={session}>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
