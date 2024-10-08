import {extractUserFromSession} from "~/server/services/session";
import {updateGoal} from "~/server/services/goals";


/**
 * Put api endpoint to update a goal from the database with a new description and goal status
 */
export default defineEventHandler(async (event) => {


    const { description, goalId, goalStatus } = await readBody(event)

    return updateGoal({ description, goalId, goalStatus })

});
