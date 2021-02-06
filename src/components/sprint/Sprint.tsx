import React, {useEffect, useState} from 'react';
import {SprintData} from "./model";
import styles from './styles.module.scss';
import {UserStoryData} from "../user_story/model";
import StoriesDroppable from "../stories_droppable/StoriesDroppable";

export function countPoints(stories: UserStoryData[]) {
  return stories.length !== 0 ? stories.map(st => st.points).reduce((prev, curr) => prev + curr) : 0;
}

export interface ISprintProps {
  sprint: SprintData;
  isDragging: boolean;
}

const Sprint: React.FC<ISprintProps> = (
  {sprint: {id, name, stories, maxPoints, allowedToDrop}, isDragging}
) => {
  const points = countPoints(stories);
  const [overflowed, setOverflowed] = useState<boolean>(false);

  useEffect(() => {
    setOverflowed(maxPoints < points);
  }, [maxPoints, points]);

  return (
    <div className={`${styles.container} ${overflowed ? styles.container_overflowed : ''}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          {name}
        </div>
        <div className={`${styles.capacity} ${overflowed ? styles.capacity_overflowed : ''}`}>
          {`${points} / ${maxPoints}`}
        </div>
      </div>
      <StoriesDroppable
        droppableProps={{droppableId: id, isDropDisabled: !allowedToDrop}}
        className={`${styles.stories} ${isDragging ? (allowedToDrop ? styles.allowedToDrop : styles.notAllowedToDrop) : ''}`}
        stories={stories}
      />
    </div>
  );
};

export default Sprint;
