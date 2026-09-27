import React from 'react';
import { useApp } from '../../context/AppContext';
import { JudgeProjectList } from './JudgeProjectList';
import { BlindEvaluationScreen } from './BlindEvaluationScreen';

export const JudgeSuite: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentView === 'judge-evaluate' ? (
        <BlindEvaluationScreen />
      ) : (
        <JudgeProjectList />
      )}
    </div>
  );
};
