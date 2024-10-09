import prisma from "~/lib/prisma";
import { GoalStatus } from "~/server/util/GoalStatusEnum";
import { Goal } from "@prisma/client";

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

/**
 *
 * @param userId
 * @param description
 * Creates a new goal and adds it to the database
 */
export const createNewGoal = (userId: number, description: string) => {
    return prisma.goal.create({
        data: {
            user_id: userId,
            description: description,
            id_goal_status: GoalStatus.NOT_STARTED,
        },
    });
};

/**
 *
 * @param goalId
 * @param goalStatus
 * @param description
 * Updates the goal within the database matching goalId with the new description and goal status
 */
export const updateGoal = ({
    goalId,
    statusId,
    description,
}: {
    goalId: number;
    statusId: GoalStatus;
    description: string;
}) => {
    return prisma.goal.update({
        where: {
            id_goal: goalId,
        },
        data: {
            description: description,
            id_goal_status: statusId,
        },
    });
};
