import {randomStory, UserStoryData} from "../user_story/model";
import {v4} from "uuid";
import {getRandomInt} from "../../utils/random";
import _ from "lodash";

export interface SprintData {
  id: string;
  name: string;
  stories: UserStoryData[];
  maxPoints: number;
}

export function randomSprint(): SprintData {
  const id = v4();
  return ({
    id,
    name: id,
    maxPoints: 20,
    stories: _.times(getRandomInt(1, 4)).map(() => randomStory())
  })
}
