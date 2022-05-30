import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ConsoleObject from './ConsoleObject';
import styled from 'styled-components';
import EditorSide from './components/EditorSide';
import Dots from './components/Dots';
import PlayButton from './components/PlayButton';
import { Frame } from './FrameRender';

type Data = (string | Frame[])[]

function App() {
  const [rerender, setRerender] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [index, setIndex] = useState(0);
  const [dataFromEditor, setDataFromEditor] = useState<any>(null);
  const [dataForRender, setDataForRender] = useState<Data>([])
  const [data, setData] = useState<Data>([]);
  const cons = useRef<HTMLDivElement>(null);


  const rerenderFunc = () => setRerender(!rerender)

  const setTerminal = (data: any[]) => {
    setTrigger(!trigger)
    setData([])
    setDataForRender(data)
  }
  useEffect(() => {
    setData([])
    if(dataForRender[0]) {
      setData(d => [...d,dataForRender[0]]);
      setIndex(1)
    }
  }, [dataForRender, trigger])

  useEffect(() => {
    const delay = setTimeout(() => {
      if(dataForRender[index]) {
        setData(d => [...d, dataForRender[index]]);
        setIndex(index + 1)
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [rerender]);


  const scrollFunc = () => {
    if(cons.current) {
      cons.current.scrollTo({top: cons.current.scrollHeight});
    }
  }

  return (
    <Application>
      <EditorSide setDataFromEditor={setDataFromEditor} data={dataForRender}/>
      <TerminalSide>
        <Terminal>
          <Dots/>
          <Console ref={cons}>
          {data.map((item, index) => {
            return <ConsoleObject key={index} scroll={scrollFunc} setRerender={rerenderFunc} item={item} />;
          })}
          </Console>
        </Terminal>
        <StartButton onClick={() => {
         let id = window.setTimeout(function() {}, 0);
          while (id--) {
            window.clearTimeout(id);
          }
          setTerminal(dataFromEditor)}}>
          <PlayButton />
        </StartButton>
      </TerminalSide>
    </Application>
  );
}


const StartButton = styled.div`
  border: none;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: green;
  width: 80px;
  height: 40px;
  &:hover {
    opacity: 0.7;
  }
`

const TerminalSide = styled.div`
  display: flex;
  flex-direction: column;
`

const Terminal = styled.div`

  display: flex;
  flex-direction: column;
  height: 300px;
  min-width: 500px;
  background-color: #06182c;
  border-radius: 5px;
`

const Console = styled.div`
  max-width: 472px;
  font-size: 14px;
  overflow: auto;
  flex: 1 1;
  margin: 12px 14px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Application = styled.div`
  display: flex;
  flex-direction: row;
  width: 1024px;
  margin: 120px auto;
  padding: 32px;
  justify-content: space-between;
  align-items: flex-start;
`

export default App;
