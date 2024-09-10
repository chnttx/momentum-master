import prisma from "~/lib/prisma";

export const getGoalById = async (id: number) => {
  return prisma.goal.findUnique({
    where: {
      id_goal : id
    }
  })
}

export const getGoalsByUser = async (userId: number) => {
  return prisma.goal.findMany({
    where: {
      user_id: userId
    },
    include: {
      user: true
    }
  })
}

export const deleteGoalsById = async (id: number) => {
  return prisma.goal.delete({
    where: {
      id_goal : id
    }
  })
}

