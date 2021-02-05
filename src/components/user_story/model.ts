import {v4} from "uuid";
import {getRandomInt, randomEnum} from "../../utils/random";

export interface UserStoryData {
  id: string;
  points: number;
  risk: Risk;
  priority: Priority;
  name: string;
  description: string;
  dependencies: string[];
}

export enum Risk {
  HIGH,
  MEDIUM,
  LOW
}

export enum Priority {
  HIGH,
  MEDIUM,
  LOW
}

export const randomStory: () => UserStoryData = () => {
  const id = v4();
  return ({
    id,
    priority: randomEnum(Priority),
    risk: randomEnum(Risk),
    name: id,
    points: getRandomInt(1, 5),
    description: id,
    dependencies: []
  });
}
