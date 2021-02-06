import React from 'react';
import {Risk, UserStoryData} from "./model";
import styles from './styles.module.scss';
import {Draggable} from "react-beautiful-dnd";

export interface IUserStoryProps {
  index: number;
  story: UserStoryData;
  setEditing: () => void;
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
  {story: {id, name, points, priority, risk}, index, setEditing}
) => (
  <Draggable draggableId={id} index={index}>
    {provided => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={`${styles.container} ${color(risk)}`}
        onClick={setEditing}
      >
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
    )}
  </Draggable>
);

export default UserStoryCard;
