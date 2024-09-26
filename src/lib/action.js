"use server"

import { revalidatePath } from "next/cache"
import { Post } from "./models"
import { connectToDb } from "./utils"

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