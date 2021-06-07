import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { changeAuthImageTC } from '../../../pages/login/bll/authReducer';
import { useDispatch } from 'react-redux';
import { Button } from '../Button';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export const FileInput: React.FC = () => {
  const dispatch = useDispatch();

  const name = useTypedSelector<string>((state) =>
    state.login.user.name);
  const inRef = useRef<HTMLInputElement>(null);

  const [fileURL, setFileURL] = useState<string>();
  const [fileData, setFileData] = useState<FormData>();

  useEffect(() => {
    if(fileData){
      dispatch(changeAuthImageTC( fileData, name, fileURL||''));
    }
  }, [dispatch, fileData, fileURL, name]);

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const formData = new FormData(); // for send to back
    const newFile = e.target.files && e.target.files[0];

    if (newFile) {
      setFileURL(window.URL.createObjectURL(newFile));
      formData.append('myFile', newFile, newFile.name);
      setFileData(formData);
      reader.readAsDataURL(newFile);
    }
  };

  const addImg = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inRef && inRef.current && inRef.current.click();
  }

  return (
    <div>
      <input
        accept='.jpg, .jpeg, .png'
        ref={inRef}
        type={'file'}
        style={{ display: 'none' }}
        onChange={upload}
      />
      <Button
        onClick={addImg}>Change image
      </Button>
      <hr style={{ width: '100%' }} />
    </div>
  );
};
