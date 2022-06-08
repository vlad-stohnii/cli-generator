import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ConsoleObject from './ConsoleObject';
import styled from 'styled-components';
import EditorSide from './components/EditorSide';
import Dots from './components/Dots';
import PlayButton from './components/PlayButton';
import { saveAs } from 'file-saver';
import Import from './components/Import';
import { Data } from './components/types';

function App() {
  const [rerender, setRerender] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [index, setIndex] = useState(0);
  const [dataFromEditor, setDataFromEditor] = useState<any>([]);
  const [dataForRender, setDataForRender] = useState<Data>([])
  const [data, setData] = useState<Data>([]);
  const [file, setFile] = useState<File | null>(null);
  const [dataFromFile, setDataFromFile] = useState<Data>([]);
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
    console.log(dataFromEditor);
  }, [dataFromEditor])

  useEffect(() => {
    const nextTiming = dataForRender[index - 1]?.timing;
    const timing = nextTiming ? nextTiming : 1000;
    const delay = setTimeout(() => {
      if(dataForRender[index]) {
        setData(d => [...d, dataForRender[index]]);
        setIndex(index + 1)
      }
    }, timing);
    return () => clearTimeout(delay);
  }, [rerender]);

  useEffect(() => {
    if(file) {
      setDataFromFile([]);
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        if(event.target) {
          if(typeof event.target.result !== 'string') {
            const enc = new TextDecoder("utf-8");
            const arr = new Uint8Array(event.target.result!);
            setDataFromFile(JSON.parse(enc.decode(arr)));
          }
        }
      });
      reader.readAsArrayBuffer(file);
    }
  }, [file])

  const scrollFunc = () => {
    if(cons.current) {
      cons.current.scrollTo({top: cons.current.scrollHeight});
    }
  }

  return (
    <Application>
      <EditorSide setDataFromEditor={setDataFromEditor} dataFromFile={dataFromFile}/>
      <TerminalSide>
        <Terminal>
          <Dots/>
          <Console ref={cons}>
          {data.map((item, index) => {
            return <ConsoleObject key={index} scroll={scrollFunc} setRerender={rerenderFunc} item={item} />;
          })}
          </Console>
        </Terminal>
        <TerminalBottomButtons>
          <StartButton onClick={() => {
            let id = window.setTimeout(function() {}, 0);
            while (id--) {
              window.clearTimeout(id);
            }
            setTerminal(dataFromEditor)}}>
            <PlayButton />
          </StartButton>
          <Import setFile={setFile}/>
          <BottomButton onClick={() => {
            let obj = JSON.stringify(dataFromEditor);
            let blob = new Blob( [obj], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "dynamic.txt");
          }}>Export</BottomButton>
        </TerminalBottomButtons>
      </TerminalSide>
    </Application>
  );
}


const StartButton = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: green;
  width: 80px;
  height: 40px;
  &:hover {
    opacity: 0.7;
  }
`

const BottomButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  &:hover { 
    opacity: 0.8;
  }
`

const TerminalBottomButtons = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 32px;
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
