import prisma from "~/lib/prisma";


export const getUserById = async ({ id }: { id: string }) => {
    return await prisma.user.findUnique({
        where: {
            user_id: id
        }
    })
}

export const createUser = async ({ username, userId, profileImage }:
    { username: string, userId: string, profileImage?: string }) => {
    return await prisma.user.create({
        data: {
            user_id: userId,
            username: username,
            profile_image: profileImage
        }
    })

}