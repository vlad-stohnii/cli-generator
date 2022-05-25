import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  close: () => void,
  data: any,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  item: any,
  itemId: number
}

const EditEditor: React.FC<Props> = ({ close, data, setData, itemId, item }) => {

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
    //Select type
    if(typeof item === 'string') {
      setType('prompt')
    } else {
      if(item.length === 1) {
        setType('output')
      } else {
        setType('frames')
      }
    }
  }, [])




  useEffect(() => {
    switch (type) {
      case 'prompt':
        if(typeof item === 'string') {
          setTextarea(item.split('<c>')[1])
        } else {
          setTextarea('')
        }
        break;
      case 'output':
        if(typeof item === 'string') {
          setTextarea('')
        } else {
          setTextarea(item[0].map((i: string) => i.split('<cons>')[1]).join('\n'))
        }
        break;
      case 'frames':
        if(typeof item === 'string') {
          setFrameList([['']])
          setFrameIndex(0);
        } else {
          setFrameList(item.map((i: string[]) => i.map((str: string) => str.split('<cons>')[1])))
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
    if (type === 'prompt') {
      const com = '<c>' + textarea + '<c>';
      let tempData = [...data]
      tempData[itemId] = com
      setData(tempData);
    }
    if (type === 'output') {
      let tempArray = textarea.split('\n');
      let tempData = [...data]
      tempData[itemId] = [tempArray.map(i => '<cons>' + i + '<cons>')]
      setData(tempData);
    }
    if (type === 'frames') {
      let tempData = [...data]
      tempData[itemId] = frameList.map((frame) => frame.map(i => '<cons>' + i + '<cons>'));
      setData(tempData);
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
  background: #00d4ff;;
  color: #081d33;
  cursor: pointer;
  padding: 8px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid grey;
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
export default EditEditor;