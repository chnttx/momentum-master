// @vitest-environment happy-dom
import { afterEach, describe, expect, test, vi } from "vitest";
import getRecommendationArr from "~/utils/reflection/getRecommendationArr";
import getMoodRating from "~/utils/reflection/getMoodRating";
import getChat from "~/utils/reflection/getChat";
import getEndSession from "~/utils/reflection/getEndSession";
import getIsReflection from "~/utils/reflection/getIsReflection";
import getLearnNewSkill from "~/utils/reflection/getLearnNewSkill";
import getSkill from "~/utils/reflection/getSkill";
import getSkillRating from "~/utils/reflection/getSkillRating";
import resetReflectionLocalStorage from "~/utils/reflection/resetReflectionLocalStorage";

const CHAT_KEY = "chat";
const END_SESSION_KEY = "endSession";
const IS_REFLECTION_KEY = "isReflection";
const LEARN_NEW_SKILL_KEY = "learnNewSkill";
const MOOD_RATING_KEY = "moodRating";
const SKILL_RATING_KEY = "skillRating";
const SKILL_KEY = "skill";
const RECOMMENDATION_ARR_KEY = "recommendationArr";

describe("Reflection Utils", () => {
    const getItemSpy = vi.spyOn(localStorage, "getItem");
    const setItemSpy = vi.spyOn(localStorage, "setItem");
    const removeItemSpy = vi.spyOn(localStorage, "removeItem");

    afterEach(() => {
        localStorage.clear();
        getItemSpy.mockClear();
        setItemSpy.mockClear();
    });

    describe("getChat", () => {
        test("gets chat from LocalStorage when it exists", () => {
            const today = new Date();
            const chat = {
                date: today.toISOString(),
                chatlog: [
                    "This is a message",
                    "This is a message",
                    "This is a message",
                    "This is a message",
                ],
                questionsAndResponses: [
                    {
                        id: 1,
                        question: "This is a question",
                        response: "This is a response",
                    },
                    {
                        id: 1,
                        question: "This is a question",
                        response: "This is a response",
                    },
                ],
            };
            localStorage.setItem(CHAT_KEY, JSON.stringify(chat));
            expect(getChat()).toStrictEqual(chat);
            expect(getItemSpy).toHaveBeenCalledWith(CHAT_KEY);
        });

        test("gets chat from LocalStorage when it exists but date is not today", () => {
            const day = new Date("1995-12-17T03:24:00");
            const chat = {
                date: day.toISOString(),
                chatlog: [
                    "This is a message",
                    "This is a message",
                    "This is a message",
                    "This is a message",
                ],
                questionsAndResponses: [
                    {
                        id: 1,
                        question: "This is a question",
                        response: "This is a response",
                    },
                    {
                        id: 1,
                        question: "This is a question",
                        response: "This is a response",
                    },
                ],
            };
            localStorage.setItem(CHAT_KEY, JSON.stringify(chat));
            expect(getChat()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(CHAT_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(CHAT_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });

        test("gets chat from LocalStorage when it doesn't exist", () => {
            expect(getChat()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(CHAT_KEY);
        });
    });

    describe("getEndSession", () => {
        test("gets endSession from LocalStorage when it exists", () => {
            const endSession = false;
            localStorage.setItem(END_SESSION_KEY, JSON.stringify(endSession));
            expect(getEndSession()).toStrictEqual(endSession);
            expect(getItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
        });

        test("gets endSession from LocalStorage when it doesn't exist", () => {
            expect(getEndSession()).toStrictEqual(false);
            expect(getItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
        });
    });

    describe("getIsReflection", () => {
        test("gets isReflection from LocalStorage when it exists", () => {
            const isReflection = false;
            localStorage.setItem(
                IS_REFLECTION_KEY,
                JSON.stringify(isReflection)
            );
            expect(getIsReflection()).toStrictEqual(isReflection);
            expect(getItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
        });

        test("gets isReflection from LocalStorage when it doesn't exist", () => {
            expect(getIsReflection()).toStrictEqual(true);
            expect(getItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
        });
    });

    describe("getLearnNewSkill", () => {
        test("gets learnNewSkill from LocalStorage when it exists", () => {
            const learnNewSkill = false;
            localStorage.setItem(
                LEARN_NEW_SKILL_KEY,
                JSON.stringify(learnNewSkill)
            );
            expect(getLearnNewSkill()).toStrictEqual(learnNewSkill);
            expect(getItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
        });

        test("gets learnNewSkill from LocalStorage when it doesn't exist", () => {
            expect(getLearnNewSkill()).toStrictEqual(false);
            expect(getItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
        });
    });

    describe("getMoodRating", () => {
        test("gets moodRating from LocalStorage when it exists", () => {
            const moodRating = 1;
            localStorage.setItem(MOOD_RATING_KEY, JSON.stringify(moodRating));
            expect(getMoodRating()).toStrictEqual(moodRating);
            expect(getItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
        });

        test("gets moodRating from LocalStorage when it doesn't exist", () => {
            expect(getMoodRating()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
        });
    });

    describe("getSkillRating", () => {
        test("gets skillRating from LocalStorage when it exists", () => {
            const skillRating = 7;
            localStorage.setItem(SKILL_RATING_KEY, JSON.stringify(skillRating));
            expect(getSkillRating()).toStrictEqual(skillRating);
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
        });

        test("gets null skillRating from LocalStorage when it doesn't exist", () => {
            expect(getSkillRating()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
        });
    });

    describe("getSkill", () => {
        test("gets skill from LocalStorage when it exists", () => {
            const skill = "This is a skill";
            localStorage.setItem(SKILL_KEY, JSON.stringify(skill));
            expect(getSkill()).toStrictEqual(skill);
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });

        test("gets empty skill from LocalStorage when it doesn't exist", () => {
            expect(getSkill()).toBeNull();
            expect(getItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });
    });

    describe("resetReflectionLocalStorage", () => {
        test("reset reflection LocalStorage", () => {
            resetReflectionLocalStorage();
            expect(removeItemSpy).toHaveBeenCalledWith(CHAT_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(END_SESSION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(IS_REFLECTION_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(LEARN_NEW_SKILL_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(MOOD_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_RATING_KEY);
            expect(removeItemSpy).toHaveBeenCalledWith(SKILL_KEY);
        });
    });

    describe("getRecommendationArr", () => {
        test("gets recommendationArr from LocalStorage when it exists", () => {
            const recommendationArr = ["resource", "resource", "resource"];
            localStorage.setItem(
                RECOMMENDATION_ARR_KEY,
                JSON.stringify(recommendationArr)
            );
            expect(getRecommendationArr()).toStrictEqual(recommendationArr);
            expect(getItemSpy).toHaveBeenCalledWith(RECOMMENDATION_ARR_KEY);
        });

        test("gets recommendationArr from LocalStorage when it doesn't exist", () => {
            expect(getRecommendationArr()).toHaveLength(0);
            expect(getItemSpy).toHaveBeenCalledWith(RECOMMENDATION_ARR_KEY);
        });
    });
});
