import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';

interface Props {
  close: () => void,
  data: any,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  item: any,
  itemId: number
}

const EditEditor: React.FC<Props> = ({ close, data, setData, itemId, item }) => {

  const [type, setType] = useState('typing');
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameList, setFrameList] = useState<string[][]>([]);

  const onChangeFrame = (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => {
    let tempArray = [...frameList];
    tempArray[key] = (e.target.value).split('\n');
    setFrameList(tempArray);
  };

  useEffect(() => {
    //Select type
    if (typeof item === 'string') {
      setType('typing');
    } else {
      if (item.length === 1) {
        setType('output');
      } else {
        setType('frames');
      }
    }
  }, []);


  useEffect(() => {
    switch (type) {
      case 'typing':
        if (typeof item === 'string') {
          setTextarea(item.split('<c>')[1]);
        } else {
          setTextarea('');
        }
        break;
      case 'output':
        if (typeof item === 'string') {
          setTextarea('');
        } else {
          setTextarea(item[0].map((i: string) => i.split('<cons>')[1]).join('\n'));
        }
        break;
      case 'frames':
        if (typeof item === 'string') {
          setFrameList([['']]);
          setFrameIndex(0);
        } else {
          setFrameList(item.map((i: string[]) => i.map((str: string) => str.split('<cons>')[1])));
          setFrameIndex(item.length);
        }
        break;
    }
  }, [type]);


  useEffect(() => {
    if (frameIndex === item.length) {
    } else {
      setFrameList([...frameList, []]);
    }
  }, [frameIndex]);

  const saveElement = () => {
    if (type === 'typing') {
      const com = '<c>' + textarea + '<c>';
      let tempData = [...data];
      tempData[itemId] = com;
      setData(tempData);
    }
    if (type === 'output') {
      let tempArray = textarea.split('\n');
      let tempData = [...data];
      tempData[itemId] = [tempArray.map(i => '<cons>' + i + '<cons>')];
      setData(tempData);
    }
    if (type === 'frames') {
      let tempData = [...data];
      tempData[itemId] = frameList.map((frame) => frame.map(i => '<cons>' + i + '<cons>'));
      setData(tempData);
    }
  };

  return (
    <StyledEditor>
      <EditorTypes>
        <TypesItem selected={type === 'typing'} onClick={() => setType('typing')}>
          Typing
        </TypesItem>
        <TypesItem selected={type === 'output'} onClick={() => setType('output')}>
          Output
        </TypesItem>
        <TypesItem selected={type === 'frames'} onClick={() => setType('frames')}>
          Frames
        </TypesItem>
      </EditorTypes>
      {}
      {type === 'frames' ? frameList.map((frame, key) => <Textarea value={frame.join('\n')}
                                                                   onChangeFrame={onChangeFrame} index={key} key={key}/>) :
        <Textarea value={textarea} setTextarea={setTextarea} />}
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
    background-color: #06182c;
    padding: 8px;
    border: none;
    color: #fff;
    height: 32px;
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
  font-size: 14px;
  color: #c9d1d9;
  border: 1px solid #30363d;
  background-color: #161b22;
  padding: 12px;
  transition: background-color 0.1s;

  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;

const TypesItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  color: ${({ selected }) => selected ? '#ffffff' : '#c9d1d9'};
  background-color: ${({ selected }) => selected ? '#34343a' : '#161b22'};
  text-align: center;
  font-size: 14px;
  border: 1px solid #30363d;
  transition: background-color 0.1s;

  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;
export default EditEditor;