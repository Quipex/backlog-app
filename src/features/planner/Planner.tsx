import React from 'react';
import Canvas from "../../features/canvas/Canvas";
import SideMenu from "../../features/side_menu/SideMenu";
import styles from './styles.module.scss';
import {useSelector} from "react-redux";
import {selectBacklog, selectIsDragging, selectSprints} from "./plannerSlice";

const Planner: React.FC = () => {
  const stories = useSelector(selectBacklog);
  const sprints = useSelector(selectSprints);
  const isDragging = useSelector(selectIsDragging);

  return (
    <>
      <Canvas className={styles.canvas} sprints={sprints} isDragging={isDragging} />
      <SideMenu stories={stories} isDragging={isDragging}/>
    </>
  );
};

export default Planner;
