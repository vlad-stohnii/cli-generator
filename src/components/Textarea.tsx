import React, { useEffect, useRef } from 'react';

interface Props {
  value: string;
  setTextarea?:  React.Dispatch<React.SetStateAction<string>>,
  onChangeFrame?: (e: React.ChangeEvent<HTMLTextAreaElement>, key: number) => void
  index?: number;
}

const Textarea:React.FC<Props> = ({value, setTextarea, index, onChangeFrame}) => {
  const text = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if(text.current) {
      text.current.style.height = "1px";
      text.current.style.height = `${text.current.scrollHeight - 2}px`;
    }
  }, [value])
  return (
    <textarea ref={text} value={value} style={{overflow: 'hidden'}} onChange={(e) => {
      if(onChangeFrame && index !== undefined) {
        onChangeFrame(e, index);
      }
      if(setTextarea) {
        setTextarea(e.target.value);
      }
      e.target.style.height = "1px";
      e.target.style.height = `${e.target.scrollHeight - 2}px`;
    }} />
  );
};

export default Textarea;