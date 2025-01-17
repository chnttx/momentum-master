import prisma from "~/lib/prisma";

//TODO: Write API endpoints to store user skill rating,
//TODO: retrieve information regarding skill used

// Get skill used by user
export const getSkillUsedByUser = async (userId: number) => {
    const allReflectionsByUser = await prisma.reflection.findMany({
        where: {
            user_id: userId,
        },
        select: {
            reflection_id: true,
        },
    });

    const ratingsByUser = await prisma.skill_used.findMany({
        where: {
            reflection_id: {
                in: allReflectionsByUser.map(
                    (reflection) => reflection.reflection_id
                ),
            },
        },
        include: {
            skill: {
                select: {
                    name: true,
                },
            },
        },

        orderBy: {
            reflection_id: "desc",
        },
    });

    if (ratingsByUser !== null) {
        const newRatingsByUser = ratingsByUser.map((rating) => {
            return {
                rating_id: rating.id_rating,
                skill_id: rating.id_skill,
                name: rating.skill.name,
                reflection_id: rating.reflection_id,
            };
        });
        return newRatingsByUser;
    }
};

/**
 * Saves a new record to the skills rating table with the appropriate reflection id as the foreign key
 */
export const storeUserSkillRating = async (
    reflection_id: number,
    rating_id: number,
    skill_id: number
) => {
    const reflectionSkillRating = await prisma.skill_used.create({
        data: {
            reflection_id: reflection_id,
            id_rating: rating_id,
            id_skill: skill_id,
        },
    });

    return reflectionSkillRating;
};

/**
 * Retrieves all rating terminology from the rating_terms table
 */
export const getSkillsRatingTerms = async () => {
    return prisma.rating_term.findMany();
};
