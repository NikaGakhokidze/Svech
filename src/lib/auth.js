
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "./utils"
import { User } from "./models"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"



const login = async (credentials) => {
    try {
        connectToDb()
        const user = await User.findOne({ username: credentials.username })

        if (!user) {
            throw new Error("Wrong credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Wrong credentials!")
        }

        return user

    } catch (err) {
        console.log(err)
        throw new Error("failed to login!")
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
        async authorize(credentials) {
            try {
                const user = await login(credentials)
                return user
            } catch (err) {
                return null;
            }
        }
    })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "github") {
                connectToDb()
                try {
                    const user = await User.findOne({ email: profile.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        })

                        await newUser.save()
                    }
                } catch (err) {
                    console.log(err)
                    return false
                }
            }
            return true
        }
    }
})