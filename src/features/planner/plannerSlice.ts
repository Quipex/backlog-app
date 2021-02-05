import {randomStory, UserStoryData} from "../../components/user_story/model";
import _ from "lodash";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {randomSprint, SprintData} from "../../components/sprint/model";

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

  }
})

export const selectBacklog = (state: RootState) => state.planner.backlog;
export const selectSprints = (state: RootState) => state.planner.sprints;

export default plannerSlice.reducer;
