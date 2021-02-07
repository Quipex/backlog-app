import {Priority, Risk, UserStoryData} from "../../components/user_story/model";
import Papa from "papaparse";
import {toastr} from "react-redux-toastr";
import {v4} from "uuid";

export function startImport(id: string) {
  let input = document.getElementById(id);
  if (input) input.click();
}

interface UserStoryRaw {
  id: string;
  name: string;
  description: string;
  points: string;
  risk: string;
  priority: string;
  dependencies: string;
}

export function mapToStories(text: string): UserStoryData[] {
  let parsed = Papa.parse(text, {header: true});
  if (parsed.errors.length > 0) {
    const title = 'Can\'t parse the csv';
    toastr.error(title, `${parsed.errors.length} errors in console`);
    console.error(title, parsed.errors);
    throw Error(title);
  } else {
    const idToUuid: IdToUUID = {};
    const stories = parsed.data as UserStoryRaw[];
    const newStories = stories.map(story => {
      return mapStory(story, idToUuid);
    });
    console.log('stories', newStories);
    return newStories;
  }
}

interface IdToUUID {
  [id: string]: string
}

const mapStory: (story: UserStoryRaw, idToUuid: IdToUUID) => UserStoryData = (story, idToUuid) => ({
  ...story,
  id: mapId(story.id, idToUuid),
  points: +story.points,
  risk: Risk[story.risk as any] as any,
  priority: Priority[story.priority as any] as any,
  dependencies: story.dependencies.replace(' ', '')
    .split(',').map(dep => mapId(dep, idToUuid))
});

const mapId = (id: string, idToUuid: IdToUUID) => {
  let realId = idToUuid[id];
  if (realId === undefined) {
    idToUuid[id] = v4();
    realId = idToUuid[id];
    console.log('unknown id, created new', id, realId);
  }
  return realId;
}
