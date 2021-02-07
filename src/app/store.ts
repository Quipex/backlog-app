import {configureStore} from '@reduxjs/toolkit';
import plannerReducer from '../features/planner/plannerSlice';
import editingReducer from '../features/editing/editingSlice';
import {reducer as toastr} from 'react-redux-toastr';

export const store = configureStore({
  reducer: {
    toastr,
    planner: plannerReducer,
    editing: editingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
