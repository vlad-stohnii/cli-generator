import React from 'react';
import Writer from './Writer';
import FrameRender from './FrameRender';
import styled from 'styled-components';

interface Props {
  item: string | string[][],
  setRerender: () => void,
}

const ConsoleObject:React.FC<Props> = ({item, setRerender}) => {
  let type = '';
  let content: string| string[][] | null = null;

  if(typeof item === 'string') {
    const codeText = item.match(/<c>((?!<cons>|<res>|<c>).)*<c>/g)
    if(codeText) {
      content = codeText[0].split('<c>')[1]
      type = 'code'
    }
  }
  if(typeof item === 'object') {
    type = 'frame'
  }

  return (
    <>
      {type === 'code' && typeof content !== 'object' && <Writer setIsRerender={setRerender} content={content}/>}
      {type === 'frame' && typeof item === 'object' && <FrameRender setRerender={setRerender} item={item}/>}
    </>
  );
};

export default ConsoleObject;