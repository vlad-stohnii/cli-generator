import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  setTerminal: (data: any[]) => void
}

const Editor:React.FC<Props> = ({setTerminal}) => {

  const [type, setType] = useState('prompt')
  const [result, setResult] = useState<any[]>([]);
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameArray, setFrameArray] = useState<string[][]>([])
  const renderFunc = () => {
    setTerminal(result)
    setType('prompt');
    setResult([]);
    setTextarea('')
  }


  const nextFrame = () => {
    if(frameArray[frameIndex + 1]) {
      setTextarea(frameArray[frameIndex + 1].join('\n'))
      setFrameIndex(frameIndex + 1)
    }
    let tempArray = [...frameArray];
    tempArray[frameIndex] = textarea.split('\n');
    setFrameArray(tempArray)
  }


  const prevFrame = () => {
    let tempArray = [...frameArray];
    tempArray[frameIndex] = textarea.split('\n');
    setFrameArray(tempArray)
    if(frameArray[frameIndex - 1]) {
      setTextarea(frameArray[frameIndex - 1].join('\n'))
      setFrameIndex(frameIndex - 1)
    }
  }

  const addFrame = () => {
    setFrameArray([...frameArray, []])
    if(frameArray.length !== 0) {
      setFrameIndex(frameIndex + 1);
    }
    let tempArray = [...frameArray];
    tempArray[frameIndex] = textarea.split('\n');
    setFrameArray(tempArray)
    setTextarea('')
  }

  const isDisabled = () => {
    if(type === 'prompt' || type === 'output') {
      return false
    }
    return !(type === 'frames' && frameArray.length !== 0);

  }


  const saveElement = () => {
    if(type === 'prompt') {
      const com = "<c>" + textarea +"<c>"
      setResult([...result, com]);
      setTextarea('')
    }
    if(type === 'output') {
      let tempArray = textarea.split('\n');
      setResult([...result, [tempArray.map(i => '<cons>' + i + '<cons>')]])
      setTextarea('')
    }
    if(type === 'frames') {
      let tempArray = [...frameArray];
      tempArray[frameIndex] = textarea.split('\n');
      setResult([...result, tempArray.map((frame) => frame.map(i => '<cons>' + i + '<cons>'))]);
      setFrameArray([])
      setTextarea('')
      setFrameIndex(0)
    }
  }
   return (
       <StyledEditor className={'editor'}>
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
         <textarea disabled={isDisabled()} value={textarea} onChange={(e) => setTextarea(e.target.value)}/>
         <button onClick={saveElement}>Add Element</button>
         {/*<button onClick={renderFunc}>Complete</button>*/}
         {type === 'frames' && <>
           <button onClick={addFrame}>Add Frame</button>
           <button onClick={nextFrame}>Next Frame</button>
           <button onClick={prevFrame}>Prev Frame</button>
         </>}
       </StyledEditor>
  );
};

const StyledEditor = styled.div`
  margin-left: 30px;
`
const EditorTypes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`

const TypesItem = styled.div<{selected: boolean}>`
  width: 100%;
  text-align: center;
  background: ${({selected}) => selected ? '#4d4d4d' : '#8d8d8d'};
`

export default Editor;