import React from 'react';
import styles from './App.module.scss';
import Planner from "./features/planner/Planner";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {moveCard} from './features/planner/plannerSlice';

function App() {
  const dispatch = useDispatch();

  return (
    <DragDropContext
      onDragEnd={result => dispatch(moveCard(result))}
    >
      <div className={styles.container}>
        <Planner/>
      </div>
    </DragDropContext>
  );
}

export default App;
