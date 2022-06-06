import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';
import DropDown from './DropDown';
import { options } from '../constants';
import { Data, DataObject, Frame } from './types';
import InlineDropDown from './InlineDropDown';

interface Props {
  close: () => void,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>,
  item: DataObject,
  itemId: number
}

const EditEditor: React.FC<Props> = ({ close, data, setData, itemId, item }) => {

  const [type, setType] = useState('typing');
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameList, setFrameList] = useState<string[][]>([]);
  const [timings, setTimings] = useState<number[]>([]);
  const [timing, setTiming] = useState<number>(500);

  const onChangeFrame = (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => {
    let tempArray = [...frameList];
    tempArray[key] = (e.target.value).split('\n');
    setFrameList(tempArray);
  };

  const onChangeTiming = (ms: number, key: number) => {
    let tempArray = [...timings];
    tempArray[key] = ms;
    setTimings(tempArray);
  };

  useEffect(() => {
    //Select type
    if (typeof item.object === 'string') {
      setType('typing');
    } else {
      if (item.object.length === 1) {
        setType('output');
      } else {
        setType('frames');
      }
    }
  }, []);


  useEffect(() => {
    switch (type) {
      case 'typing':
        if (typeof item.object === 'string') {
          setTextarea(item.object);
          setTiming(item.timing ? item.timing : 500);
        } else {
          setTextarea('');
        }
        break;
      case 'output':
        if (typeof item.object === 'string') {
          setTextarea('');
          setTiming(500);
        } else {
          setTextarea(item.object[0].frame.join('\n'));
          setTiming(item.timing ? item.timing : 500);
        }
        break;
      case 'frames':
        if (typeof item.object === 'string') {
          setFrameList([['']]);
          setFrameIndex(0);
        } else {
          setFrameList(item.object.map((i) => i.frame));
          let notNull = item.object.filter(i => i.timing !== null);
          let tempTimings = notNull.map((i) => i.timing!);
          tempTimings.push(item.timing ? item.timing : 500);
          setTimings([...tempTimings])
          setFrameIndex(item.object.length);
        }
        break;
    }
  }, [type]);


  useEffect(() => {
    if (frameIndex === item.object.length) {
    } else {
      setFrameList(f => [...f, []]);
      if(frameList.length === 1) {
        setTimings(t => [...t, 0]);
      } else {
        setTimings(t => {
          let copy = [...t];
          copy = [...copy, copy[timings.length - 1]];
          return copy
        })
      }
    }
  }, [frameIndex]);

  const saveElement = () => {
    if (type === 'typing') {
      let tempData = [...data];
      tempData[itemId] = {
        object: textarea,
        timing: timing
      };
      setData(tempData);
    }
    if (type === 'output') {
      let tempData = [...data];
      tempData[itemId] = {
        object: [{
          timing: null,
          frame: textarea.split('\n')
        }],
         timing: timing
      };
      setData(tempData);
    }
    if (type === 'frames') {
      let frameObject: Frame[] = [];
      frameList.forEach((element, index) => {
        frameObject.push({
          timing: timings[index] || null,
          frame: element
        });
      });
      frameObject[frameList.length - 1].timing = null;
      let tempData = [...data];
      tempData[itemId] = {
        object: frameObject,
        timing: timings[frameList.length - 1]
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
              <Textarea value={frame.join('\n')}
                        onChangeFrame={onChangeFrame} index={key}/>
                <DropDown options={options} selected={timings[key]}  setItem={onChangeTiming} index={key} />
            </TextAreaWithTiming>
        ) :
        <TextAreaWithTiming>
          <Textarea value={textarea} setTextarea={setTextarea}/>
          <InlineDropDown options={options} selected={timing}  setItem={setTiming} />
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
`


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