import React from 'react';
import styles from './App.module.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Planner from "./features/planner/Planner";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {moveCard, setIsDragged, updateDroppables} from './features/planner/plannerSlice';
import ReduxToastr from "react-redux-toastr";
import {RootState} from "./app/store";

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
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"
        // @ts-ignore
        getState={(state: RootState) => state.toastr}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
      <div className={styles.container}>
        <Planner/>
      </div>
    </DragDropContext>
  );
}

export default App;
