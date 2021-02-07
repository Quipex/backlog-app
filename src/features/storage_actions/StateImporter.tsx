import React, {useRef, useState} from 'react';
import {Modal, ModalContent} from "semantic-ui-react";
import {toastr} from "react-redux-toastr";

export interface IStateImporterProps {
  uniqueId: string;
  importText: string;
  successText: string;
  onFileRead: (data: string) => void;
}

const StateImporter: React.FC<IStateImporterProps> = (
  {uniqueId, importText, onFileRead, successText}
) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileReader] = useState<FileReader>(() => {
    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsUploading(true);
    };
    reader.onloadend = () => setIsUploading(false);
    reader.onload = ev => {
      console.log('onload', ev);
      if (ev.target && typeof ev.target.result === "string") {
        try {
          onFileRead(ev.target.result);
          toastr.success(successText, 'Application should now update');
        } catch (e) {
          toastr.error('Can\'t parse the file', e?.message);
          console.error(e);
        }
      } else {
        toastr.error('Can\'t read the file', 'Type of the result is not string');
      }
    }
    return reader;
  });

  const handleFileInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log('file changed');
    const {files} = ev.target;
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      toastr.error('Can\'t select file', 'Multiple files upload is not supported');
      return;
    }
    fileReader.readAsText(files[0]);
    // @ts-ignore
    ev.target.value = null;
  };

  return (
    <>
      <input ref={inputRef} id={uniqueId} type="file" onChange={handleFileInputChange} style={{display: "none"}}/>
      <Modal open={isUploading} size="mini">
        <ModalContent>{importText}</ModalContent>
      </Modal>
    </>
  );
};

export default StateImporter;
