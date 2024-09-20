export type Reflection = {
    date: string;
    moodRating: number;
    skillId: number;
    skillRatingId: number;
    questionsAndResponses: { questionId: number; response: string }[];
};
