import prisma from "~/lib/prisma";


export const getUserById = async ({ id }: { id: string }) => {
    return prisma.user.findUnique({
        where: {
            user_id: id
        }
    });
}

export const getUserByUsername = async ({ username }: {username: string}) => {

    return prisma.user.findFirst({
        where: {
            username: username
        }
    })
}

export const createUser = async ({ username, profileImage }:
    { username: string, profileImage?: string }) => {


    return prisma.user.create({
        data: {
            username: username,
            profile_image: profileImage
        }
    });

}

/**
 *
 * @param username
 * If a user in the database can be found with the given username parameter, returns true. Returns false if no user is
 * found. Throws an error if there multiple users with the same username in the database
 */
export const doesUserExist = async ({ username }: { username: string | null | undefined }) => {

    if (username === undefined || username === null) {
        return false;
    }

    let userCount;
    try {

        userCount = await prisma.user.count({
            where: {
                username: username
            }
        })
    } catch (err) {
        console.error(err)
        return false
    }

    if (userCount === 0) {
        return false
    }
    if (userCount === 1) {
        return true
    }

    throw new Error("Duplicated username in database")



}