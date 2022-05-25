import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  close: () => void,
  data: any,
  setData: React.Dispatch<React.SetStateAction<any[]>>
}

const NewEditor: React.FC<Props> = ({ close, data, setData }) => {

  const [type, setType] = useState('prompt');
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameList, setFrameList] = useState<string[][]>([]);

  const onChangeFrame = (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => {
    let tempArray = [...frameList];
    tempArray[key] = (e.target.value).split('\n');
    setFrameList(tempArray)
  }

  useEffect(() => {
    setTextarea('');
    if (type === 'frames') {
      setFrameIndex(1);
    }
  }, [type]);
  useEffect(() => {
    if (frameIndex === 1) {
      setFrameList([[]]);
    } else {
      setFrameList([...frameList, []]);
    }
  }, [frameIndex]);

  const saveElement = () => {
    if (type === 'prompt') {
      const com = '<c>' + textarea + '<c>';
      setData([...data, com]);
      setTextarea('');
    }
    if (type === 'output') {
      let tempArray = textarea.split('\n');
      setData([...data, [tempArray.map(i => '<cons>' + i + '<cons>')]]);
      setTextarea('');
    }
    if (type === 'frames') {
      setData([...data, frameList.map((frame) => frame.map(i => '<cons>' + i + '<cons>'))]);
      setTextarea('');
      setFrameIndex(1);
    }
  };

  return (
    <StyledEditor>
      <EditorTypes>
        <TypesItem selected={type === 'prompt'} onClick={() => setType('prompt')}>
          Prompt
        </TypesItem>
        <TypesItem selected={type === 'output'} onClick={() => setType('output')}>
          Output
        </TypesItem>
        <TypesItem selected={type === 'frames'} onClick={() => setType('frames')}>
          Frames
        </TypesItem>
      </EditorTypes>
      {}
      {type === 'frames' ? frameList.map((frame, key) => <textarea value={frame.join('\n')} key={key}
                                                                   onChange={(e) => onChangeFrame(e,key)} />) :
        <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} />}
      {type === 'frames' && <SaveButton onClick={() => {
        setFrameIndex(frameIndex + 1);
      }
      }>Add frame</SaveButton>}
      <SaveButton onClick={() => {
        saveElement();
        close();
      }}>Save</SaveButton>
    </StyledEditor>
  );
};

const StyledEditor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  textarea {
    background-color: #124677;
    padding: 8px;
    border: none;
    color: #fff;
    height: 88px;
    font-size: 14px;
    resize: none;
    outline: none;
    border-top: 1px solid #081d33;
    border-bottom: 1px solid #081d33;
  }
`;
const EditorTypes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const SaveButton = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 8px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid grey;
  background: #00d4ff;;
  color: #081d33;
  transition: background-color 0.1s;
  &:hover {
    background-color: #fff;
  }
`;

const TypesItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  font-size: 14px;
  color: #081d33;
  transition: background-color 0.1s;
  &:hover {
    background-color: #fff;
  }
  background-color: ${({ selected }) => selected ? '#fff' : '#00d4ff'};
`;

export default NewEditor;