"use server"

import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"
import bcrypt from "bcrypt"

export const addPost = async (formData) => {

    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })

        await newPost.save()
        console.log("saved to DB")
        revalidatePath("/blog")  // << this code needed to reflect changes immediatelly on blog page.
    } catch (err) {
        console.log(err)
        return {
            error: "Something went wrong"
        }
    }
    console.log(title, desc, slug, userId)
}




export const deletePost = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()


        await Post.findByIdAndDelete(id)
        console.log("deleted from DB")
        revalidatePath("/blog")  // << this code needed to reflect changes immediatelly on blog page.
    } catch (err) {
        console.log(err)
        return {
            error: "Something went wrong"
        }
    }
}



export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const handleLogout = async () => {
    "use server";
    await signOut("github");
};

export const register = async (formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)
    if (password !== passwordRepeat) {
        return "Password do not match!"
    }



    try {
        connectToDb()
        const user = await User.findOne({ username })

        if (user) {
            return "Username already exists!"
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        })
        await newUser.save();
        console.log("new User saved to DB")
    } catch (err) {
        throw new Error(err)
    }
}