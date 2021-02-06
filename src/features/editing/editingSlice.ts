import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SprintData} from "../../components/sprint/model";
import {UserStoryData} from "../../components/user_story/model";
import {RootState} from "../../app/store";
import {saveSprint, saveStory, removeSprint, removeStory} from "../planner/plannerSlice";

interface EditingState {
  sprint: SprintData | undefined;
  story: StoryEditingData | undefined;
}

export interface StoryEditingData {
  content: UserStoryData,
  source?: SourceProps;
}

const initialState: EditingState = {
  sprint: undefined,
  story: undefined
}

export interface SourceProps {
  droppableId: string;
  index: number;
}

export const editingSlice = createSlice({
  name: 'editing',
  initialState,
  reducers: {
    setEditingSprint: (state, {payload}: PayloadAction<SprintData | undefined>) => {
      state.sprint = payload;
    },

    setEditingStory: (state, {payload}: PayloadAction<StoryEditingData | undefined>) => {
      state.story = payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(saveSprint, state => state.sprint = undefined)
      .addCase(saveStory, state => state.story = undefined)
      .addCase(removeStory, state => state.story = undefined)
      .addCase(removeSprint, state => state.sprint = undefined)
  }
})

export const {setEditingSprint, setEditingStory} = editingSlice.actions;

const data = (state: RootState) => state.editing;

export const selectEditingSprint = (state: RootState) => data(state).sprint;
export const selectEditingStory = (state: RootState) => data(state).story;

export default editingSlice.reducer;
