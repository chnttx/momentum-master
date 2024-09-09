import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
    console.log("Fetching users from the database")
    const users = await prisma.user.findMany();
    console.log("There are now", users.length, "users in the database")
    return users;
})