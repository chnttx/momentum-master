import {getRecommendedResources} from "~/server/services/reflection";

/**
 * Post endpoint to get recommended resources based on user's answers
 */
export default defineEventHandler(async (event) => {
    const { userResponse, skill } = await readBody(event)

    const resources = await getRecommendedResources({ userResponses: userResponse, skill: skill })

    return {
        resources: resources
    }

})
