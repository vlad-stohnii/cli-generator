import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';
import DropDown from './DropDown';
import { options } from '../constants';
import InlineDropDown from './InlineDropDown';
import { ConsoleObjectType, ConsoleObjects, Frame } from './types';

interface Props {
  close: () => void,
  data: ConsoleObjects,
  setData: React.Dispatch<React.SetStateAction<ConsoleObjects>>,
  item: ConsoleObjectType,
  itemId: number
}

const EditEditor: React.FC<Props> = ({ close, data, setData, itemId, item }) => {

  const [type, setType] = useState('typing');
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameList, setFrameList] = useState<string[]>([]);
  const [timings, setTimings] = useState<number[]>([]);
  const [timing, setTiming] = useState<number>(500);

  const onChangeFrame = (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => {
    let tempArray = [...frameList];
    tempArray[key] = (e.target.value);
    setFrameList(tempArray);
  };

  const onChangeTiming = (ms: number, key: number) => {
    let tempArray = [...timings];
    tempArray[key] = ms;
    setTimings(tempArray);
  };

  useEffect(() => {
    //Select type
    if ('input' in item) {
      setType('typing');
    }
    if ('output' in item) {
      setType('output');
    }
    if ('frames' in item) {
      setType('frames');
    }
  }, []);


  useEffect(() => {
    switch (type) {
      case 'typing':
        if ('input' in item) {
          setTextarea(item.input);
          setTiming(item.timing ? item.timing : 500);
        } else {
          setTextarea('');
        }
        break;
      case 'output':
        if ('output' in item) {
          setTextarea(item.output);
          setTiming(item.timing ? item.timing : 500);
        } else {
          setTextarea('');
        }
        break;
      case 'frames':
        if ('frames' in item) {
          setFrameList(item.frames.map((i) => i.value));
          setTimings(item.frames.map((i) => i.timing));
          setFrameIndex(item.frames.length);
        } else {
          setTextarea('');
          setFrameIndex(0);
        }
        break;
    }
  }, [type]);


  useEffect(() => {
    if ('frames' in item) {
      if (frameIndex === item.frames.length) {
      } else {
        setFrameList(f => [...f, '']);
        if (frameList.length === 1) {
          setTimings(t => [...t, 0]);
        } else {
          setTimings(t => {
            let copy = [...t];
            copy = [...copy, copy[timings.length - 1]];
            return copy;
          });
        }
      }
    }
  }, [frameIndex]);

  const saveElement = () => {
    if (type === 'typing') {
      let tempData = [...data];
      tempData[itemId] = {
        input: textarea,
        timing: timing
      };
      setData(tempData);
    }
    if (type === 'output') {
      let tempData = [...data];
      tempData[itemId] = {
        output: textarea,
        timing: timing
      };
      setData(tempData);
    }
    if (type === 'frames') {
      let framesObject: Frame[] = [];
      frameList.forEach((element, index) => {
        framesObject.push({
          timing: timings[index],
          value: element
        })
      });
      let tempData = [...data];
      tempData[itemId] = {
        frames: framesObject,
      };
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
      {type === 'frames' ? frameList.map((frame, key) =>
          <TextAreaWithTiming key={key}>
            <Textarea value={frame}
                      onChangeFrame={onChangeFrame} index={key} />
            <DropDown options={options} selected={timings[key]} setItem={onChangeTiming} index={key} />
          </TextAreaWithTiming>
        ) :
        <TextAreaWithTiming>
          <Textarea value={textarea} setTextarea={setTextarea} />
          <InlineDropDown options={options} selected={timing} setItem={setTiming} />
        </TextAreaWithTiming>
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

  input {
    background-color: black;
    border: 0;
    padding: 11px 8px;
  }

  textarea {
    background-color: #06182c;
    padding: 14px 8px;
    border: none;
    color: #fff;
    height: 20px;
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

const TextAreaWithTiming = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #06182c;
  border-top: 1px solid #081d33;
  border-bottom: 1px solid #081d33;

  textarea {
    flex: auto;
    border: none;
  }
`;


const SaveButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  color: #c9d1d9;
  border: 1px solid #30363d;
  background-color: #161b22;
  padding: 14px;
  transition: background-color 0.1s;

  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;

const TypesItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  width: 100%;
  padding-top: 14px;
  padding-bottom: 14px;
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