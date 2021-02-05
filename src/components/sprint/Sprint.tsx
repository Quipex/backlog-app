import React from 'react';
import {SprintData} from "./model";
import UserStoryCard from "../user_story/UserStory";
import styles from './styles.module.scss';
import {Droppable} from "react-beautiful-dnd";

const Sprint: React.FC<SprintData> = (
  {id, name, stories, maxPoints}
) => {
  const points = stories.length !== 0 ? stories.map(st => st.points).reduce((prev, curr) => prev + curr) : 0;

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
      <Droppable droppableId={id}>
        {provided => (
          <div
            className={styles.stories}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {stories.map((st, index) => <UserStoryCard key={st.id} story={st} index={index}/>)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Sprint;
