import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Writer from './Writer';
import ParseString from './utils/ParseString';
import ConsoleObject from './ConsoleObject';


const code = ['<c>npm run loading<c>','<cons>loading...<cons>','<cons>loading...<cons>','<cons>loading...<cons>','<cons>loading...<cons>','<res>loading successful<res>',];

const terminal_code = '<c>npm run loading<c>' +
  '<cons>loading...<cons>' +
  '<cons>loading 25%<cons>' +
  '<cons>loading 50%<cons>' +
  '<cons>loading 90%<cons>' +
  '<cons>loading 100%<cons>' +
  '<res>loading successful<res>'

export interface TypingObject {
  command: string,
  console: any[],
  res: any[],
}

function App() {
  const [isTyping, setIsTyping] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  const [loadingBlocks, setLoadingBlocks] = useState<string[]>([]);
  const [resultBlocks, setResultBlocks] = useState<string[]>([]);


  const [data, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, [])


  const [typing, setTyping] = useState<TypingObject>({
    command: '',
    console: [],
    res: [],
  })
  if (isTyping && cursor.current) {
    cursor.current.style.animation = 'none'
  } else {
    if( cursor.current) {
      cursor.current.style.animation = 'blink 0.7s step-start 0s infinite'
    }
  }

  useEffect(() => {
    if(!isTyping) {
      setTimeout(() => {
        if( cursor.current) {
          cursor.current.style.display = 'none';
          setIsLoading(true)
        }
      }, 1000)
    }
  }, [isTyping])

  useEffect(() => {
    setTyping(ParseString(terminal_code))
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(typing.console[loadingBlocks.length]) {
        setLoadingBlocks([...loadingBlocks, typing.console[loadingBlocks.length]])
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [loadingBlocks, isLoading])

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if(loadingBlocks.length === typing.console.length) {
      timeout = setTimeout(() => {
        if(typing.res[resultBlocks.length]) {
          setResultBlocks([...resultBlocks, typing.res[resultBlocks.length]])
        }
      }, 500)
    }
    return () => clearTimeout(timeout)
  }, [resultBlocks, loadingBlocks])




  return (
    <div className="App">
      <div className={'terminal__container'}>
        <div className={'command-line'}>${typing && typing.command && <Writer isTyping={setIsTyping} content={typing.command}/>}<div ref={cursor} className={'cursor'}/></div>
        {loadingBlocks && loadingBlocks.map(i =><div className={'console'}>&#62; {i}</div>)}
        {resultBlocks && resultBlocks.map(i =><div className={'result'}>{i}</div>)}
        {data.map(item => <ConsoleObject item={item}/>)}
      </div>
    </div>
  );
}

export default App;
