import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import client from '../../../database/index';
import { findUser } from '../../../database/user';
import bcrypt from 'bcrypt';

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
			async authorize(credentials, req) {
				const payload = {
					email: credentials.email,
					password: credentials.password,
				};

				// Check database for that email
				const user = await findUser(client, { email: payload.email });
				if (!user) return null;
				// Check if the password is correct
				try {
					const isMatch = await bcrypt.compare(payload.password, user.password);
					return (isMatch) ? user : null;
				} catch (err) {
					console.log(err);
					return null;
				}
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					...token,
					accessToken: user.id,
					refreshToken: user.id,
				};
			}

			return token;
		},

		async session({ session, token }) {
			session.user.id = token.accessToken;
			session.user.id = token.refreshToken;
			session.user.id = token.accessTokenExpires;

			return session;
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
