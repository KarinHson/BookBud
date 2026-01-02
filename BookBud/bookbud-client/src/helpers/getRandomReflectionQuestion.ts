import { reflectionQuestions } from './reflectionQuestions';

export const getRandomReflectionQuestion = (): string => {
    const randomIndex = Math.floor(
      Math.random() * reflectionQuestions.length
    );

    return reflectionQuestions[randomIndex];
};
