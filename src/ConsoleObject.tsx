import React from 'react';
import Writer from './Writer';
import FrameRender from './FrameRender';
import { ConsoleObjectType } from './components/types';
import OutputRender from './components/OutputRender';

interface Props {
  item: ConsoleObjectType,
  setRerender: () => void,
  scroll: () => void
}

const ConsoleObject:React.FC<Props> = ({item, setRerender, scroll}) => {
  return (
    <>
      {'input' in item &&  <Writer scroll={scroll} setIsRerender={setRerender} item={item}/>}
      {'output' in item &&  <OutputRender item={item} setRerender={setRerender} scroll={scroll}/>}
      {'frames' in item && <FrameRender scroll={scroll} setRerender={setRerender} item={item}/>}
    </>
  );
};

export default ConsoleObject;