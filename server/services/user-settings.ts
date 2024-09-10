import prisma from "~/lib/prisma";

export const getSettingByUser = async (userId: number) => {
  return prisma.user_setting.findMany({
    where : {
      user_id : userId
    }
  })
}

export const updateSettingsByUser = async (userId: number, setting: any) => {
  return prisma.user_setting.updateMany({
    where : {
      user_id : userId
    },
    data : setting
  })
}


