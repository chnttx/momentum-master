/**
 * @typedef {Object} Goal
 * @property {string} description The description of the goal
 * @property {number} goalId The id of the goal
 * @property {number} statusId The status id of the goal
 */
export type Goal = {
    description: string;
    goalId: number;
    statusId: number;
};
