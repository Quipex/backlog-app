import {randomStory, UserStoryData} from "../../components/user_story/model";
import _ from "lodash";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {randomSprint, SprintData} from "../../components/sprint/model";
import {DropResult} from "react-beautiful-dnd";

interface PlannerState {
  backlog: UserStoryData[];
  sprints: SprintData[];
}

const initialState: PlannerState = {
  backlog: _.times(5).map(() => randomStory()),
  sprints: _.times(5).map(() => randomSprint())
}

export const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    moveCard: (state, {payload: {draggableId, source, destination}}: PayloadAction<DropResult>) => {
      if (!destination) return;

      // REMOVE
      let story: UserStoryData | undefined = undefined;
      if (source.droppableId === BACKLOG) {
        state.backlog.filter(st => {
          if (st.id === draggableId) {
            story = st;
            return true;
          }
          return false;
        });
      } else {
        state.sprints.map(sprint => {
          if (sprint.id === source.droppableId) {
            return {
              ...sprint,
              stories: sprint.stories.filter(st => {
                if (st.id === draggableId) {
                  story = st;
                  return true;
                }
                return false;
              })
            }
          } else {
            return sprint;
          }
        });
      }

      if (story === undefined) return;

      // ADD
      if (destination.droppableId === BACKLOG) {
        state.backlog.splice(destination.index, 0, story);
      } else {
        state.sprints.map(sprint => {
          if (sprint.id === destination.droppableId) {
            sprint.stories.splice(destination.index, 0, story as UserStoryData);
          }
          return sprint;
        })
      }
    }
  }
});

export const BACKLOG = 'Backlog';

export const {moveCard} = plannerSlice.actions;

export const selectBacklog = (state: RootState) => state.planner.backlog;
export const selectSprints = (state: RootState) => state.planner.sprints;

export default plannerSlice.reducer;
