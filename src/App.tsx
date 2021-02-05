import React from 'react';
import styles from './App.module.scss';
import Planner from "./features/planner/Planner";

function App() {
  return (
    <div className={styles.container}>
      <Planner />
    </div>
  );
}

export default App;
