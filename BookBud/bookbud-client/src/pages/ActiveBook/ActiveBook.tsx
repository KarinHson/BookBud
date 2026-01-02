import './ActiveBook.scss';
import { ActiveBookCard } from '../../components/ActiveBookCard/ActiveBookCard';
import ReflectionQuestionCard from '../../components/ReflectionQuestionCard/ReflectionQuestionCard';
import { getRandomReflectionQuestion } from '../../helpers/getRandomReflectionQuestion';

export const ActiveBook = () => {

    return (
        <>
        <h1>Active book</h1>
        <ActiveBookCard/>
        <ReflectionQuestionCard question={getRandomReflectionQuestion()} />
        </>
    );
};