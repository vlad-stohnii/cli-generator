import React from 'react';
import Writer from './Writer';
import FrameRender from './FrameRender';
import { DataObject } from './components/types';

interface Props {
  item: DataObject,
  setRerender: () => void,
  scroll: () => void
}

const ConsoleObject:React.FC<Props> = ({item, setRerender, scroll}) => {
  return (
    <>
      {typeof item.object === 'string' &&  <Writer scroll={scroll} setIsRerender={setRerender} item={item}/>}
      {typeof item.object !== 'string' && <FrameRender scroll={scroll} setRerender={setRerender} item={item}/>}
    </>
  );
};

export default ConsoleObject;