import React from 'react';
import styles from './App.module.scss';
import Planner from "./features/planner/Planner";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {moveCard, updateDroppables, setIsDragged} from './features/planner/plannerSlice';
import Editing from "./features/editing/Editing";

function App() {
  const dispatch = useDispatch();

  return (
    <DragDropContext
      onDragStart={initial => {
        dispatch(updateDroppables(initial))
        dispatch(setIsDragged(true))
      }}
      onDragEnd={result => {
        dispatch(moveCard(result))
        dispatch(setIsDragged(false))
      }}
    >
      <div className={styles.container}>
        <Planner/>
        <Editing/>
      </div>
    </DragDropContext>
  );
}

export default App;
