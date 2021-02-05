import React from 'react';
import {Risk, UserStoryData} from "./model";
import styles from './styles.module.scss';

export interface IUserStoryProps {
  story: UserStoryData;
}

const color = (priority: Risk) => {
  switch (priority) {
    case Risk.HIGH:
      return styles.high;
    case Risk.MEDIUM:
      return styles.medium;
    case Risk.LOW:
      return styles.low;
    default:
      return '';
  }
}

const UserStoryCard: React.FC<IUserStoryProps> = (
  {story: {id, dependencies, description, name, points, priority, risk}}
) => (
  <div className={`${styles.container} ${color(risk)}`}>
    <div className={styles.points_container}>
      <div className={styles.points}>
        {points}
      </div>
    </div>
    <div className={styles.name}>
      {name}
    </div>
    <div className={styles.priority}>{`Priority: ${Risk[priority]}`}</div>
  </div>
);

export default UserStoryCard;
