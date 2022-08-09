import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const res = await fetch(`${process.env.APIURL}/api/auth/login`, {
					method: 'post',
					headers: {
						'content-type': 'application/json;charset=UTF-8',
					},
					body: JSON.stringify({
						password: credentials.password,
						email: credentials.email,
						code: '100',
					}),
				});

				const data = await res.json();
				return (data.success) ? data.user : null;

			},
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			return {
				...token,
				...user,
				accessToken: user?.id,
				refreshToken: user?.id,
			};
		},
		session({ session, user, token }) {
			console.log('session', session);
			console.log('user', user);
			console.log('token', token);
			return token;
		},
	},
	theme: {
		colorScheme: 'auto',
		brandColor: '',
		logo: '/vercel.svg',
	},
	// Enable debug messages in the console if you are having problems
	debug: process.env.NODE_ENV === 'development',
});
