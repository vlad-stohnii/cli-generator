import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Textarea from './Textarea';
import DropDown from './DropDown';
import { options } from '../constants';
import { Data, Frame } from './types';

interface Props {
  close: () => void,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>
}

const NewEditor: React.FC<Props> = ({ close, data, setData }) => {

  const [type, setType] = useState('typing');
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(1);
  const [frameList, setFrameList] = useState<string[][]>([[]]);
  const [timings, setTiming] = useState<number[]>([]);

  const onChangeFrame = (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => {
    let tempArray = [...frameList];
    tempArray[key] = (e.target.value).split('\n');
    setFrameList(tempArray);
  };
  const onChangeTiming = (ms: number, key: number) => {
    let tempArray = [...timings];
    tempArray[key] = ms;
    setTiming(tempArray);
  };

  useEffect(() => {
    if (frameIndex === 1) {
      setFrameList([[]]);
      setTiming([500]);
    } else {
      setFrameList(f => [...f, []]);
      if(frameList.length === 1) {
        setTiming(t => [...t, 0]);
      } else {
        setTiming(t => {
          let copy = [...t];
          copy[timings.length - 1] = copy[timings.length - 2];
          copy = [...copy, 0];
          return copy
        })
      }
    }
  }, [frameIndex]);

  const saveElement = () => {
    if (type === 'typing') {
      setData([...data, {
        object: textarea,
        timing: null
      }]);
      setTextarea('');
    }
    if (type === 'output') {
      setData([...data, {
        object: [{
          frame: textarea.split('\n'),
          timing: null
        }],
        timing: null
      }]);
      setTextarea('');
    }
    if (type === 'frames') {
      let frameObject: Frame[] = [];
      frameList.forEach((element, index) => {
        frameObject.push({
          timing: timings[index] || null,
          frame: element
        });
      });
      setData([...data, {
        object: frameObject,
        timing: null
      }]);
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
      {type === 'frames' ? frameList.map((frame, key) => {
          return frameList.length > 1 ?
            <TextAreaWithTiming key={key}>
              <Textarea value={frame.join('\n')}
                        onChangeFrame={onChangeFrame} index={key}/>
              {!(key === frameList.length - 1) &&
                <DropDown options={options} selected={timings[key]}  setItem={onChangeTiming} index={key} />}
            </TextAreaWithTiming> : <Textarea value={frame.join('\n')}
                            onChangeFrame={onChangeFrame} index={key} key={key} />;
        }) :
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

export default NewEditor;