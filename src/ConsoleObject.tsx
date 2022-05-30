import React from 'react';
import Writer from './Writer';
import FrameRender, { Frame } from './FrameRender';

interface Props {
  item: string | Frame[],
  setRerender: () => void,
  scroll: () => void
}

const ConsoleObject:React.FC<Props> = ({item, setRerender, scroll}) => {
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
      {type === 'code' && typeof content !== 'object' && <Writer scroll={scroll} setIsRerender={setRerender} content={content}/>}
      {type === 'frame' && typeof item === 'object' && <FrameRender scroll={scroll} setRerender={setRerender} item={item}/>}
    </>
  );
};

export default ConsoleObject;