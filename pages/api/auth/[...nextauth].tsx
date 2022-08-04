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
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				// Check database for that email
				const user = await findUser(client, { email: credentials.email });
				if (!user) return null;
				// Check if the password is correct
				try {
					const isMatch = await bcrypt.compare(credentials.password, user.password);
					console.log(user);
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
			return {
				...token,
				...user,
				accessToken: account?.id,
				refreshToken: account?.id,
			};
		},
		session({ token }) {
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
