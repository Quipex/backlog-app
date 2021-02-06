import React from 'react';
import styles from './styles.module.scss';
import {SprintData} from "../../components/sprint/model";
import Sprint from "../../components/sprint/Sprint";
import {useDispatch} from "react-redux";
import { setEditingSprint } from '../editing/editingSlice';

export interface ICanvasProps {
  className: string;
  sprints: SprintData[];
  isDragging: boolean;
}

const Canvas: React.FC<ICanvasProps> = (
  {className, sprints, isDragging}
) => {
  const dispatch = useDispatch();

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.sprints}>
        {sprints.map(sp => (
          <Sprint
            key={sp.id}
            sprint={sp}
            isDragging={isDragging}
            setEditing={() => dispatch(setEditingSprint(sp))}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
