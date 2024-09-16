import prisma from "~/lib/prisma";

//TODO: Write API endpoints to store user skill rating, 
//TODO: retrieve information regarding skill used

// Get skill used by user
export const getSkillUsedByUser = async (userId: number) => { 
    const allReflectionsByUser = await prisma.reflection.findMany({
        where: {
            user_id: userId
        },
        select: {
            reflection_id: true
        }
    })

    const ratingsByUser = await prisma.skill_used.findMany({
        where: {
            reflection_id: {
                in: allReflectionsByUser.map(reflection => reflection.reflection_id)
            }
        },
        select: {
            id_rating: true,
            id_skill: true,
        }
    })

    return ratingsByUser    
}


export const storeUserSkillRating = async (reflection_id: number, rating_id: number, skill_id: number ) => {
    const reflectionSkillRating = await prisma.skill_used.create({
        data: {
            reflection_id: reflection_id,
            id_rating: rating_id,
            id_skill: skill_id
        }
    })

    return reflectionSkillRating
}

export const getSkillsRatingTerms = async () => {

    return prisma.rating_term.findMany();
}