import React, { useEffect } from 'react';
import { ConsoleObjectType } from './types';

interface Props {
  item: ConsoleObjectType,
  setRerender: () => void,
  scroll: () => void
}

const OutputRender: React.FC<Props> = ({setRerender, item, scroll}) => {
  useEffect(() => {
    setRerender();
    scroll()
  },[])
  return (
    <div style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>
      {'output' in item && item.output}
    </div>
  );
};

export default OutputRender;