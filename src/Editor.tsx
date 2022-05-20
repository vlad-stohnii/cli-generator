import React, { useState } from 'react';

interface Props {
  setTerminal: (data: any[]) => void
}

const Editor:React.FC<Props> = ({setTerminal}) => {

  const [type, setType] = useState('command')
  const [result, setResult] = useState<any[]>([]);
  const [textarea, setTextarea] = useState<string>('');
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameArray, setFrameArray] = useState<string[][]>([])
  const renderFunc = () => {
    setTerminal(result)
    setType('command');
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
      setTextarea('')
      setFrameIndex(frameIndex + 1);
    } else {
      let tempArray = [...frameArray];
      tempArray[frameIndex] = textarea.split('\n');
      setFrameArray(tempArray)
      setTextarea('')
    }
  }

  const isDisabled = () => {
    if(type === 'command' || type === 'log') {
      return false
    }
    return !(type === 'frame' && frameArray.length !== 0);

  }


  const saveElement = () => {
    if(type === 'command') {
      const com = "<c>" + textarea +"<c>"
      setResult([...result, com]);
      setTextarea('')
    }
    if(type === 'log') {
      const cons = "<cons>" + textarea +"<cons>"
      setResult([...result, cons]);
      setTextarea('')
    }
    if(type === 'frame') {
      let tempArray = [...frameArray];
      tempArray[frameIndex] = textarea.split('\n');
      setResult([...result, tempArray.map((frame) => frame.map(i => '<cons>' + i + '<cons>'))]);
      setFrameArray([])
      setTextarea('')
      setFrameIndex(0)
    }
  }
   return (
    <div className={'editor'}>
      <div>
        <div>
          <label htmlFor={'com'}>Command:</label>
          <input id={'com'} checked={type === 'command'} type='radio' name={'type'} value={'command'}  onChange={(e) => setType(e.target.value)}/>
        </div>
        <div>
          <label htmlFor={'log'}>Log:</label>
          <input id={'log'} checked={type === 'log'} type='radio' name={'type'} value={'log'} onChange={(e) => setType(e.target.value)}/>
        </div>
        <div>
          <label htmlFor={'frame'}>Frame:</label>
          <input id={'frame'} checked={type === 'frame'} type='radio' name={'type'} value={'frame'} onChange={(e) => setType(e.target.value)}/>
        </div>
      </div>
      type : {type}
      <textarea disabled={isDisabled()} value={textarea} onChange={(e) => setTextarea(e.target.value)}/>
      <button onClick={saveElement}>Add Element</button>
      <button onClick={() => console.log(result)}>Log</button>
      <button onClick={renderFunc}>Complete</button>
      {type === 'frame' && <>
        <button onClick={addFrame}>Add Frame</button>
        <button onClick={nextFrame}>Next Frame</button>
        <button onClick={prevFrame}>Prev Frame</button>
          Frames: {frameArray.length} Current: {isDisabled() ? 0:  frameIndex + 1}</>}
      <div>Items: {result.length}</div>
    </div>
  );
};

export default Editor;