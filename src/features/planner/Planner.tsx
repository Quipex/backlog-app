import React from 'react';
import Canvas from "../../features/canvas/Canvas";
import SideMenu from "../../features/side_menu/SideMenu";
import {useSelector} from "react-redux";
import {selectBacklog, selectIsDragging, selectSprints} from "./plannerSlice";
import UnsavedDropPreventer from "../unsaved_drop_preventer/UnsavedDropPreventer";
import Editing from "../editing/Editing";

const Planner: React.FC = () => {
  const stories = useSelector(selectBacklog);
  const sprints = useSelector(selectSprints);
  const isDragging = useSelector(selectIsDragging);

  return (
    <>
      <UnsavedDropPreventer stories={stories} sprints={sprints} />
      <Editing />
      <Canvas sprints={sprints} isDragging={isDragging}/>
      <SideMenu stories={stories} isDragging={isDragging}/>
    </>
  );
};

export default Planner;
