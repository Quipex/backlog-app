import React from 'react';
import styles from './styles.module.scss';
import {SprintData} from "../../components/sprint/model";
import Sprint from "../../components/sprint/Sprint";

export interface ICanvasProps {
  className: string;
  sprints: SprintData[];
  isDragging: boolean;
}

const Canvas: React.FC<ICanvasProps> = (
  {className, sprints, isDragging}
) => (
  <div className={`${styles.container} ${className || ''}`}>
    <div className={styles.sprints}>
      {sprints.map(sp => <Sprint key={sp.id} sprint={sp} isDragging={isDragging} />)}
    </div>
  </div>
);

export default Canvas;
