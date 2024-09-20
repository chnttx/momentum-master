export const useReflectionState = () => {
    const isReflection = useState<Boolean>("isReflection", () => true);
    const learnNewSkill = useState<Boolean>("learnNewSkill", () => false);
    const endSession = useState<Boolean>("endSession", () => false);

    const setIsReflection = (newState: Boolean | null) => {
        if (newState != null) {
            isReflection.value = newState;
            if (import.meta.client)
                localStorage.setItem(
                    "isReflection",
                    JSON.stringify(isReflection.value)
                );
        }
    };

    const setLearnNewSkill = (newState: Boolean | null) => {
        if (newState != null) {
            learnNewSkill.value = newState;
            if (import.meta.client)
                localStorage.setItem(
                    "learnNewSkill",
                    JSON.stringify(learnNewSkill.value)
                );
        }
    };

    const setEndSession = (newState: Boolean | null) => {
        if (newState != null) {
            endSession.value = newState;
            if (import.meta.client)
                localStorage.setItem(
                    "endSession",
                    JSON.stringify(endSession.value)
                );
        }
    };

    const initReflectionState = () => {
        setIsReflection(getIsReflection());
        setLearnNewSkill(getLearnNewSkill());
        setEndSession(getEndSession());
    };

    return {
        isReflection,
        learnNewSkill,
        endSession,
        setIsReflection,
        setLearnNewSkill,
        setEndSession,
        initReflectionState,
    };
};
