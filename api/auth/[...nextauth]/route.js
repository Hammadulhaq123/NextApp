import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET_KEY
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try {
            await connectToDB();


            // Checking if a user already exists?
            // If exists we are going to log him in using his email
            const userExists = await User.findOne({
                email: profile.email,
            });


            // If user doesn't exists we are going to create a new User
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture,
                })
            }
            // Signin function will take the charge of logging the user in.


        } catch (error) {
            console.log(error)
        }

    }
})

export { handler as GET, handler as POST }