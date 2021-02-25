import {store} from "../../app/store";

export const exportStateAndAskDownload = () => {
  const {backlog, sprints} = store.getState().planner;
  const dataToExport = {backlog, sprints};
  askToDownload(JSON.stringify(dataToExport));
  window.onbeforeunload = null;
}

const askToDownload = (text: string) => {
  const data = new Blob([text], {type: 'text/plain'});
  const dataAsUrl = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.setAttribute('download', 'save.json');
  link.href = dataAsUrl;
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    const event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
    window.URL.revokeObjectURL(dataAsUrl);
  });
}
