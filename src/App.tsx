import React, { useEffect, useState } from 'react';
import './App.css';
import ConsoleObject from './ConsoleObject';
import styled from 'styled-components';
import EditorSide from './components/EditorSide';
import Dots from './components/Dots';
import PlayButton from './components/PlayButton';

type Data = (string | string[][])[]

function App() {
  const [rerender, setRerender] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [index, setIndex] = useState(0);
  const rerenderFunc = () => setRerender(!rerender)

  const [dataFromEditor, setDataFromEditor] = useState<any>(null);

  const [dataForRender, setDataForRender] = useState<Data>([])
  const [data, setData] = useState<Data>([]);
  const setTerminal = (data: any[]) => {
    setTrigger(!trigger)
    setData([])
    setDataForRender(data)
  }
  useEffect(() => {
    setData([])
    if(dataForRender[0]) {
      setData([...data, dataForRender[0]]);
      setIndex(1)
    }
  }, [dataForRender, trigger])

  useEffect(() => {
    const delay = setTimeout(() => {
      if(dataForRender[index]) {
        setData([...data, dataForRender[index]]);
        setIndex(index + 1)
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [rerender]);


  return (
    <Application>
      <EditorSide setDataFromEditor={setDataFromEditor} data={dataForRender}/>
      <Terminal>
        <StartButton onClick={() => {
          let id = window.setTimeout(function() {}, 0);
          while (id--) {
            window.clearTimeout(id);
          }
          setTerminal(dataFromEditor)}}>
          <PlayButton />
        </StartButton>
        <Dots/>
        {data.map((item, index) => {
          return <ConsoleObject key={index} setRerender={rerenderFunc} item={item} />;
        })}
      </Terminal>
    </Application>
  );
}


const StartButton = styled.button`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  border-radius: 10px;
  opacity: 0;
  &:hover {
    background: white;
    opacity: 0.1;
  }
`

const Terminal = styled.div`
  position: relative;
  height: 300px;
  min-width: 500px;
  background-color: #06182c;
  border-radius: 10px;
  padding: 20px;
`
const Application = styled.div`
  display: flex;
  flex-direction: row;
  width: 1024px;
  margin: 120px auto;
  padding: 32px;
  background-color: #081d33;
  justify-content: center;
  gap: 30px;
  align-items: flex-start;
`

export default App;
