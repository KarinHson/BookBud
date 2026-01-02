import './ReflectionQuestionCard.scss';
import React from 'react';
import { Sparkles } from 'lucide-react';

interface ReflectionQuestionCardProps {
  question: string;
}

const ReflectionQuestionCard: React.FC<ReflectionQuestionCardProps> = ({ question }) => {
  return (
    <div className="reflection-card">
      <div className="reflection-card__icon">
        <Sparkles />
      </div>
      <div className="reflection-card__content">
        <h3 className="reflection-card__title">Reflection Question</h3>
        <p className="reflection-card__question">{question}</p>
      </div>
    </div>
  );
};

export default ReflectionQuestionCard;
