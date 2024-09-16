import prisma from "~/lib/prisma";

export const getAllSkills = async () => {
    const skills = await prisma.skill.findMany()

    return skills
}