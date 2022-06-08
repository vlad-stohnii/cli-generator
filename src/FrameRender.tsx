import React, { useEffect, useState } from 'react';
import { ConsoleObjectType } from './components/types';


interface Props {
  item: ConsoleObjectType,
  setRerender: () => void,
  scroll: () => void
}

const FrameRender: React.FC<Props> = ({ item, setRerender, scroll }) => {

  const [frameIndex, setFrameIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState<string>();
  const changeFrame = () => {
    if ('frames' in item && item.frames[frameIndex + 1]) {
      setTimeout(() => {
        setFrameIndex(frameIndex + 1);
      }, item.frames[frameIndex].timing);
    }
  };
  useEffect(() => {
    if ('frames' in item) {
      setCurrentFrame(item.frames[frameIndex].value);
    }
  }, [frameIndex]);
  useEffect(() => {
    scroll();
    if ('frames' in item && frameIndex === item.frames.length - 1) {
      setTimeout(() => {
        setRerender();
      }, item.frames[frameIndex].timing);
    } else {
      changeFrame();
    }
  }, [currentFrame]);

  return (
    <div style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>
      <div>{currentFrame}</div>
    </div>
  );
};

export default FrameRender;