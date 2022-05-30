import React, { useEffect, useRef, useState } from 'react';

interface Props {
  setIsRerender: () => void
  content: string;
  scroll: () => void
}

const Writer: React.FC<Props> = ({setIsRerender, content = '', scroll}) => {
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
      setTypedSuperpower(content.slice(0, typedSuperpower.length + 1))
    }, 50)
    return () => clearTimeout(timeout)
  }, [typedSuperpower])
  useEffect(() => {
    if(typedSuperpower === content) {
      setIsTyping(false)
      setIsRerender();
      setTimeout(() => {
        if(cursor.current) {
          cursor.current.style.display = 'none';
        }
      }, 1000)
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