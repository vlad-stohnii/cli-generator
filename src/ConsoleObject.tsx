import React, { useEffect, useState } from 'react';
import Writer from './Writer';
import FrameRender from './FrameRender';

interface Props {
  item: string | string[][],
  setRerender: () => void,
}

const ConsoleObject:React.FC<Props> = ({item, setRerender}) => {
  let type = '';
  let content: string| string[][] | null = null;


  if(typeof item === 'string') {
    const codeText = item.match(/<c>((?!<cons>|<res>|<c>).)*<c>/g)
    const consoleText = item.match(/<cons>((?!<c>|<res>|<cons>).)*<cons>/g)
    if(codeText) {
      content = codeText[0].split('<c>')[1]
      type = 'code'
    }
    if(consoleText) {
      content = consoleText[0].split('<cons>')[1]
      type = 'console';
    }
  }
  if(typeof item === 'object') {
    type = 'frame'
  }


  useEffect(() => {
    return () => {
      if(type === 'console') setRerender()
    }
  },[])


  return (
    <>
      {type === 'code' && typeof content !== 'object' && <Writer setIsRerender={setRerender} content={content}/>}
      {type === 'console' && <div className={'log'}>{content}</div>}
      {type === 'frame' && typeof item === 'object' && <FrameRender setRerender={setRerender} item={item}/>}
    </>
  );
};

export default ConsoleObject;