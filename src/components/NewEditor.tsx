import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';

interface Props {
  close: () => void,
  data: any,
  setData: React.Dispatch<React.SetStateAction<any[]>>
}

const NewEditor: React.FC<Props> = ({ close, data, setData }) => {

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
    if (type === 'typing') {
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
                                                                   onChangeFrame={onChangeFrame} index={key} key={key} />) :
        <Textarea value={textarea} setTextarea={setTextarea} />
      }
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

export default NewEditor;