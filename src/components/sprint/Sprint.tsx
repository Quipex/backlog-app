import React, {useEffect, useState} from 'react';
import {SprintData} from "./model";
import styles from './styles.module.scss';
import {UserStoryData} from "../user_story/model";
import StoriesDroppable from "../stories_droppable/StoriesDroppable";
import {Button} from "semantic-ui-react";
// @ts-ignore
import AnimatedNumber from "animated-number-react";

export function countPoints(stories: UserStoryData[]) {
  return stories.length !== 0 ? stories.map(st => st.points).reduce((prev, curr) => prev + curr) : 0;
}

export interface ISprintProps {
  sprint: SprintData;
  isDragging: boolean;
  setEditing?: () => void;
}

const Sprint: React.FC<ISprintProps> = (
  {sprint: {id, name, stories, maxPoints, allowedToDrop}, isDragging, setEditing}
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
        <Button onClick={setEditing} icon="pencil" compact/>
        <div className={`${styles.capacity} ${overflowed ? styles.capacity_overflowed : ''}`}>
          <AnimatedNumber
            value={points}
            formatValue={(val: number) => val.toFixed(0)}
            duration={60}
          />
          &nbsp;
          {`/ ${maxPoints}`}
        </div>
      </div>
      <StoriesDroppable
        droppableProps={{droppableId: id, isDropDisabled: !allowedToDrop}}
        className={`${styles.stories_droppable} ${isDragging ? (allowedToDrop ? styles.allowedToDrop : styles.notAllowedToDrop) : ''}`}
        stories={stories}
      />
    </div>
  );
};

export default Sprint;
