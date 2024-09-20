import prisma from "~/lib/prisma";

/**
 * Retrieves all skills from the postgres skill table
 */
export const getAllSkills = async () => {
    const skills = await prisma.skill.findMany()

    return skills
}