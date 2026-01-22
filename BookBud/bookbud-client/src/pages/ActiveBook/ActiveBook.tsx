import './ActiveBook.scss';
import { ActiveBookCard } from '../../components/ActiveBookCard/ActiveBookCard';
import ReflectionQuestionCard from '../../components/ReflectionQuestionCard/ReflectionQuestionCard';
import { getRandomReflectionQuestion } from '../../helpers/getRandomReflectionQuestion';

export const ActiveBook = () => {

    return (
        <div className='page-container'>
            <h1>Current book</h1>
            <ActiveBookCard/>
            <ReflectionQuestionCard question={getRandomReflectionQuestion()} />
        </div>
    );
};