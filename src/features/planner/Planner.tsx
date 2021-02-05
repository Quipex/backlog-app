import React from 'react';
import Canvas from "../../features/canvas/Canvas";
import SideMenu from "../../features/side_menu/SideMenu";
import styles from './styles.module.scss';
import {useSelector} from "react-redux";
import {selectBacklog, selectSprints} from "./plannerSlice";

export interface IPlannerProps {
}

const Planner: React.FC<IPlannerProps> = (props) => {
  const stories = useSelector(selectBacklog);
  const sprints = useSelector(selectSprints);

  return (
    <>
      <Canvas className={styles.canvas} sprints={sprints} />
      <SideMenu stories={stories}/>
    </>
  );
};

export default Planner;
