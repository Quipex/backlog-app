import {configureStore} from '@reduxjs/toolkit';
import plannerReducer from '../features/planner/plannerSlice';
import editingReducer from '../features/editing/editingSlice';

export const store = configureStore({
  reducer: {
    planner: plannerReducer,
    editing: editingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
