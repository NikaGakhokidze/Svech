"use server"

import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"
import bcrypt from "bcrypt"

export const addPost = async (prevState, formData) => {

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
    // if we seperate client and server logic in adminPosts.jsx then we need to DIRECTLY pass ID into this function instead of destructuring from formData
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


export const addUser = async (prevState, formData) => {

    const { username, email, password, img } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newUser = new User({
            username,
            email,
            password,
            img
        })

        await newUser.save()
        console.log("saved to DB")
        revalidatePath("/admin")  // << this code needed to reflect changes immediatelly on admin page.
        revalidatePath("/blog")  // << this code needed to reflect changes immediatelly on blog page.
    } catch (err) {
        console.log(err)
        return {
            error: "Something went wrong"
        }
    }
    console.log(username, email, password, img)
}




export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()

        await Post.deleteMany({ userId: id })  // Deletes every post of the user we are removing რომელ იუზერსაც ვშლით მაგის პოსტებს წაშლის ყველას
        await User.findByIdAndDelete(id)
        console.log("deleted from DB")
        revalidatePath("/admin")  // << this code needed to reflect changes immediatelly on admin page.
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

export const handleGoogleLogin = async () => {
    "use server";
    await signIn("google")
}

export const handleLogout = async () => {
    "use server";
    await signOut("github");
};

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)
    if (password !== passwordRepeat) {
        return { error: "Passwords do not match!" }
    }



    try {
        connectToDb()
        const user = await User.findOne({ username })

        if (user) {
            return { error: "Username already exists!" }
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
        return { success: true }
    } catch (err) {
        throw new Error(err)
    }
}

export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message === "NEXT_REDIRECT") throw err;


        if (err.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
    }
};