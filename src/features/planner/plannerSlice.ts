import {randomStory, UserStoryData} from "../../components/user_story/model";
import _ from "lodash";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {randomSprint, SprintData} from "../../components/sprint/model";
import {DraggableLocation, DragStart, DropResult} from "react-beautiful-dnd";
import {countPoints} from "../../components/sprint/Sprint";

interface PlannerState {
  backlog: UserStoryData[];
  sprints: SprintData[];
  currentlyDragged: boolean;
}

const initialState: PlannerState = {
  backlog: _.times(5).map(() => randomStory()),
  sprints: _.times(5).map(() => randomSprint()),
  currentlyDragged: false
}

const getStory = (state: PlannerState, source: DraggableLocation) => {
  let targetStory;
  if (source.droppableId === BACKLOG) {
    targetStory = state.backlog[source.index];
  } else {
    const sprint = state.sprints.find(sp => sp.id === source.droppableId);
    targetStory = sprint?.stories[source.index];
  }
  return targetStory
}

export const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    moveCard: (state, {payload: {draggableId: targetStoryId, source, destination}}: PayloadAction<DropResult>) => {
      state.sprints.forEach(sp => sp.allowedToDrop = true);
      if (!destination) return;

      const targetStory = getStory(state, source);
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
    },
    updateDroppables: (state, {payload: {source}}: PayloadAction<DragStart>) => {
      const targetStory = getStory(state, source);
      if (!targetStory) return;

      state.sprints.forEach(sp => {
        if (sp.id !== source.droppableId) {
          const points = countPoints(sp.stories);
          sp.allowedToDrop = sp.maxPoints >= (points + targetStory.points);
        }
      })
    },
    setIsDragged: (state, {payload}: PayloadAction<boolean>) => {
      state.currentlyDragged = payload;
    }
  }
});

export const BACKLOG = 'Backlog';

export const {moveCard, updateDroppables, setIsDragged} = plannerSlice.actions;

export const selectBacklog = (state: RootState) => state.planner.backlog;
export const selectSprints = (state: RootState) => state.planner.sprints;
export const selectIsDragging = (state: RootState) => state.planner.currentlyDragged;

export default plannerSlice.reducer;
