import React from 'react';
import {SprintData} from "./model";
import UserStoryCard from "../user_story/UserStory";
import styles from './styles.module.scss';

const Sprint: React.FC<SprintData> = (
  {name, stories, maxPoints}
) => {
  const points = stories.map(st => st.points).reduce((prev, curr) => prev + curr);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {name}
        </div>
        <div className={styles.capacity}>
          {`${points} / ${maxPoints}`}
        </div>
      </div>
      <div className={styles.stories}>
        {stories.map(st => (<UserStoryCard story={st}/>))}
      </div>
    </div>
  );
};

export default Sprint;
