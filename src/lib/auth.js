
import NextAuth from "next-auth"
import { connectToDb } from "./utils"
import { User } from "./models"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { authConfig } from "./auth.config"



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
    ...authConfig,
    providers: [GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
            }
        }
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
    }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "github") {
                connectToDb()
                console.log(profile)
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


            if (account.provider === "google") {
                connectToDb()
                console.log(profile)
                try {
                    const user = await User.findOne({ email: profile.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile.name,
                            email: profile.email,
                            image: profile.picture
                        })
                        await newUser.save()
                    }
                } catch (err) {
                    console.log(err)
                    return false
                }
            }

            return true
        },
        ...authConfig.callbacks
    }
})