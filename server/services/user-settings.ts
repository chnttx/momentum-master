import prisma from "~/lib/prisma";

/**
 *
 * @param userId
 * Retrieves all of a user's settings
 */
export const getSettingByUser = async (userId: number) => {
  return prisma.user_setting.findMany({
    where : {
      user_id : userId
    }
  })
}

/**
 *
 * @param userId
 * @param setting
 * Updates a user's settings
 */
export const updateSettingsByUser = async (userId: number, setting: any) => {
  return prisma.user_setting.updateMany({
    where : {
      user_id : userId
    },
    data : setting
  })
}


