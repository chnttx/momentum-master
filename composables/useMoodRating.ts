export const useMoodRating = () => {
    const moodRating = useState<number | null>("moodRating", () => null);
    const moodRated = useState<Boolean>(
        "moodRated",
        () => moodRating.value != null
    );
    const setMoodRating = (newMoodRating: number | null) => {
        if (!moodRating.value && newMoodRating != null) {
            moodRating.value = newMoodRating;
            if (import.meta.client)
                localStorage.setItem(
                    "moodRating",
                    JSON.stringify(moodRating.value)
                );
            moodRated.value = true;
        }
    };

    const initMoodRating = () => {
        setMoodRating(getMoodRating());
    };

    return { moodRating, moodRated, setMoodRating, initMoodRating };
};
