import type { Goal } from "~/types/Goal";

export const useGoal = () => {
    enum GoalStatus {
        NOT_STARTED = 1,
        IN_PROGRESS = 2,
        COMPLETE = 3,
    }

    const goal = useState<Goal | null>();

    const setGoal = (target: Goal | null) => {
        goal.value = target;
    };

    return { goal, setGoal, GoalStatus };
};
