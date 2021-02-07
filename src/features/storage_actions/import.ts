import {UserStoryData} from "../../components/user_story/model";

export function startImport(id: string) {
  let input = document.getElementById(id);
  if (input) input.click();
}

export function mapToStories(text: string): UserStoryData[] {
  return [];
}
