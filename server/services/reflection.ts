import prisma from "~/lib/prisma"
export const getReflectionById = async (id: number) => {
  return prisma.reflection.findUnique({
    where: {
      reflection_id : id
    }
  })
}

export const deleteReflectionById = async (id: number) => {
  return prisma.reflection.delete({
    where: {
      reflection_id : id
    }
  })
}

export const getReflectionsByUser = async (userId: number) => {
  return prisma.reflection.findMany({
    where: {
      user_id: userId
    },
    include: {
      user: true
    }
  })
}
