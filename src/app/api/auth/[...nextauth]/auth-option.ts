import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Enter your email" },
				password: { label: "password", type: "password", placeholder: "Enter your email" },
			},
			async authorize(credentials) {
				const user = [{
					id: '1',
					email: "hi@gmail.com",
					password: "12"
				}]

				const foundUser = user.find(user => user.email === credentials?.email)
				if (!foundUser) return null

				const isPasswordMatch = foundUser.password === credentials?.password
				if (!isPasswordMatch) return null

				return foundUser
			},
		})
	],
}
