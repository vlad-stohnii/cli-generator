import React, { useEffect, useState } from 'react';

interface Props {
  isTyping: React.Dispatch<React.SetStateAction<boolean>>
  content: string;
}

const Writer: React.FC<Props> = ({isTyping, content = ''}) => {
  const [typedSuperpower, setTypedSuperpower] = useState('')
  useEffect(() => {
    const timeout =setTimeout(() => {
      setTypedSuperpower(content.slice(0, typedSuperpower.length + 1))
    }, 100)
    return () => clearTimeout(timeout)
  }, [typedSuperpower])
  useEffect(() => {
    if(typedSuperpower === content) {
      isTyping(false)
    }
  }, [typedSuperpower])
  return (
    <span className={'command'}>
      {typedSuperpower}
    </span>
  );
};

export default Writer;