import React, { useEffect, useState } from 'react';
import { DataObject } from './components/types';


interface Props {
  item: DataObject,
  setRerender: () => void,
  scroll: () => void
 }

const FrameRender:React.FC<Props> = ({item, setRerender, scroll}) => {

  const [frameIndex, setFrameIndex] = useState(0);
  const [currentFrame, setCurrentFrame ] = useState<string[]>([]);
  const changeFrame = () => {
    if(typeof item.object === 'object' && item.object[frameIndex + 1]) {
      setTimeout(() => {
        setFrameIndex(frameIndex + 1);
      }, item.object[frameIndex].timing || 1000)
    }
  }
  useEffect(() => {
    if(typeof item.object === 'object') {
      setCurrentFrame(item.object[frameIndex].frame);
    }
  }, [frameIndex]);
  useEffect(() => {
    scroll();
    if(frameIndex === item.object.length - 1) {
      setRerender()
    } else {
      changeFrame()
    }
  }, [currentFrame])

  return (
    <div style={{whiteSpace: 'break-spaces', wordBreak: 'break-all'}}>
      {currentFrame.map((i, index) => <div key={index}>{i}</div>)}
    </div>
  );
};

export default FrameRender;