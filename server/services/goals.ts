import prisma from "~/lib/prisma";

/**
 *
 * Retrieves a goal from the postgres database by id
 */
export const getGoalById = async (id: number) => {
    return prisma.goal.findUnique({
        where: {
            id_goal: id,
        },
    });
};

/**
 *
 * Retrieves all the goals from the goals table within the postgres database
 */
export const getGoalsByUser = async (userId: number) => {
    return prisma.goal.findMany({
        where: {
            user_id: userId,
        },
    });
};

/**
 *
 * Deletes the goal with id from the goals table
 */
export const deleteGoalsById = async (id: number) => {
    return prisma.goal.delete({
        where: {
            id_goal: id,
        },
    });
};
