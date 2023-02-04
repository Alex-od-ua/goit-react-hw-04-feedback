import { useState } from 'react';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { SectionH2, SectionH1 } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import css from './App.module.css';

export function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const { good, neutral, bad } = feedback;

  const onFeedbackButtonClick = state => {
    setFeedback(prevState => {
      return { ...prevState, [state]: prevState[state] + 1 };
    });
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    if (good) {
      return Math.round((good / (good + neutral + bad)) * 100) + '%';
    } else {
      return '0%';
    }
  };

  return (
    <div className={css.app__container}>
      <div className={css.feedback}>
        <SectionH1 title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(feedback)}
            onFeedbackButtonClick={onFeedbackButtonClick}
          />
        </SectionH1>

        <SectionH2 title="Statistics:">
          {countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </SectionH2>
      </div>
    </div>
  );
}
