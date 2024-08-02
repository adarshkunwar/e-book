import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Enter your email" },
				password: { label: "Password", type: "password", placeholder: "Enter your password" },
			},
			async authorize(credentials, req) {
				const users = [
					{
						id: "1",
						email: "hi@gmail.com",
						password: "12",
					},
				];

				const foundUser = users.find((user) => user.email === credentials?.email);

				if (!foundUser) return null;

				const isPasswordMatch = foundUser.password === credentials?.password;

				if (!isPasswordMatch) return null;

				return foundUser;
			},
		}),
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
