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
    moveCard: (state, {payload: {draggableId: targetStoryId, source, destination}}: PayloadAction<DropResult>) => {
      if (!destination) return;

      let targetStory;
      if (source.droppableId === BACKLOG) {
        targetStory = state.backlog.find(st => st.id === targetStoryId);
      } else {
        const sprint = state.sprints.find(sp => sp.id === source.droppableId);
        targetStory = sprint?.stories.find(st => st.id === targetStoryId);
      }
      console.log('target story', targetStory);
      if (!targetStory) return;

      if (source.droppableId === BACKLOG) {
        state.backlog = state.backlog.filter(st => st.id !== targetStoryId)
      } else {
        const sprint = state.sprints.find(sp => sp.id === source.droppableId);
        if (sprint) {
          sprint.stories = sprint.stories.filter(st => st.id !== targetStoryId)
        }
      }

      if (destination.droppableId === BACKLOG) {
        state.backlog.splice(destination.index, 0, targetStory);
      } else {
        const sprint = state.sprints.find(sp => sp.id === destination.droppableId);
        sprint?.stories.splice(destination.index, 0, targetStory);
      }
    }
  }
});

export const BACKLOG = 'Backlog';

export const {moveCard} = plannerSlice.actions;

export const selectBacklog = (state: RootState) => state.planner.backlog;
export const selectSprints = (state: RootState) => state.planner.sprints;

export default plannerSlice.reducer;
