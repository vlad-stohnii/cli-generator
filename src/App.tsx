import React, { useEffect, useState } from 'react';
import './App.css';
import ConsoleObject from './ConsoleObject';
import Editor from './Editor';

type Data = (string | string[][])[]

function App() {
  const [rerender, setRerender] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [index, setIndex] = useState(0);
  const rerenderFunc = () => setRerender(!rerender)
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
    <div className="App">
      <Editor setTerminal={setTerminal}/>
      <div className={'terminal__container'}>
        {data.map((item, index) => {
          return <ConsoleObject key={index} setRerender={rerenderFunc} item={item} />;
        })}
      </div>
    </div>
  );
}

export default App;
