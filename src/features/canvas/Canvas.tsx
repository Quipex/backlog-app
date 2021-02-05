import React from 'react';
import styles from './styles.module.scss';
import {SprintData} from "../../components/sprint/model";
import Sprint from "../../components/sprint/Sprint";

export interface ICanvasProps {
  className: string;
  sprints: SprintData[];
}

const Canvas: React.FC<ICanvasProps> = (
  {className, sprints}
) => (
  <div className={`${styles.container} ${className || ''}`}>
    <div className={styles.sprints}>
      {sprints.map(sp => <Sprint key={sp.id} id={sp.id} name={sp.name} stories={sp.stories} maxPoints={sp.maxPoints}/>)}
    </div>
  </div>
);

export default Canvas;
