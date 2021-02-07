import React, {useCallback, useState} from 'react';
import {useToasts} from "react-toast-notifications";
import {Modal, ModalContent} from "semantic-ui-react";

export interface IStateImporterProps {
  uniqueId: string;
  importText: string;
  onFileRead: (data: string) => void;
}

const StateImporter: React.FC<IStateImporterProps> = ({uniqueId, importText, onFileRead}) => {
  const [isUploading, setIsUploading] = useState(false);
  const {addToast} = useToasts();

  const error = useCallback((message: string) => addToast(message, {
    appearance: "error",
    autoDismiss: true
  }), [addToast]);
  const success = useCallback(message => addToast(message, {appearance: "success", autoDismiss: true}), [addToast]);

  const [fileReader] = useState<FileReader>(() => {
    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsUploading(true);
    };
    reader.onloadend = () => setIsUploading(false);
    reader.onload = ev => {
      if (ev.target && typeof ev.target.result === "string") {
        try {
          onFileRead(ev.target.result);
          success('Imported state!');
        } catch (e) {
          error('Can\'t parse the file');
          console.error(e);
        }
      } else {
        error('Can\'t read the file')
      }
    }
    return reader;
  });

  const handleFileInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = ev.target;
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      error('Multiple files upload is not supported');
      return;
    }
    fileReader.readAsText(files[0]);
  };

  return (
    <>
      <input id={uniqueId} type="file" onChange={handleFileInputChange} style={{display: "none"}}/>
      <Modal open={isUploading} size="mini">
        <ModalContent>{importText}</ModalContent>
      </Modal>
    </>
  );
};

export default StateImporter;
