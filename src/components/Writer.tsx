import React, { useEffect, useRef, useState } from 'react';
import { ConsoleObjectType } from './types';

interface Props {
  setIsRerender: () => void
  item: ConsoleObjectType;
  scroll: () => void
}

const Writer: React.FC<Props> = ({setIsRerender, item, scroll}) => {
  const [isTyping, setIsTyping] = useState(true);
  const cursor = useRef<HTMLDivElement>(null);
  const [typedSuperpower, setTypedSuperpower] = useState('')
  if (isTyping && cursor.current) {
    cursor.current.style.animation = 'none'
  } else {
    if( cursor.current) {
      cursor.current.style.animation = 'blink 0.7s step-start 0s infinite'
    }
  }
  useEffect(() => {
    scroll()
    const timeout = setTimeout(() => {
      if('input' in item)
      setTypedSuperpower(item.input.slice(0, typedSuperpower.length + 1))
    }, 100)
    return () => clearTimeout(timeout)
  }, [typedSuperpower])
  useEffect(() => {

    if('input' in item && typedSuperpower === item.input) {
      setIsTyping(false)
      setIsRerender();
      setTimeout(() => {
        if(cursor.current) {
          cursor.current.style.display = 'none';
        }
      }, item.timing ? item.timing / 2 : 1000)
    }
  }, [typedSuperpower])
  return (
      <div className={'command-line'}>
          ~ <span className={'command'}>
            {typedSuperpower}
        <span ref={cursor} className={'cursor'}>&nbsp;</span>
          </span>

      </div>
  );
};

export default Writer;