import React, { useEffect, useState } from 'react';

export interface Frame {
  frame: string[],
  nextFrameTiming: number
}


interface Props {
  item: Frame[],
  setRerender: () => void
 }

const FrameRender:React.FC<Props> = ({item, setRerender}) => {

  const [frameIndex, setFrameIndex] = useState(0);
  const [currentFrame, setCurrentFrame ] = useState<any[]>([]);
  const changeFrame = () => {
    if(typeof item === 'object' && item[frameIndex + 1]) {
      setTimeout(() => {
        setFrameIndex(frameIndex + 1);
      }, item[frameIndex].nextFrameTiming || 1000)
    }
  }
  useEffect(() => {
    let content: any[] = []
    item[frameIndex].frame.forEach((i) => {
      const consoleText = i.match(/<cons>((?!<c>|<res>|<cons>).)*<cons>/g)
        if(consoleText) {
          content.push(consoleText[0].split('<cons>')[1])
        }
      })
    setCurrentFrame(content);
  }, [frameIndex]);
  useEffect(() => {
    if(frameIndex === item.length - 1) {
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