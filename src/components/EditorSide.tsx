import React, { useEffect, useState } from 'react';
import NewEditor from './NewEditor';
import styled from 'styled-components';
import EditItem from './EditItem';
import { ConsoleObjects } from './types';

interface Props {
  setDataFromEditor: React.Dispatch<React.SetStateAction<ConsoleObjects>>;
  dataFromFile: ConsoleObjects;
}


const EditorSide: React.FC<Props> = ({ setDataFromEditor,dataFromFile }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [data, setData] = useState<ConsoleObjects>([]);
  const toggle = () => {
    setIsAdding(!isAdding);
  };
  useEffect(() => {
    if(dataFromFile) {
      setData(dataFromFile)
    }
  }, [dataFromFile])
  useEffect(() => {
    setDataFromEditor(data);
  }, [data]);
  return (
    <Editor>
      {data.map((i, index) => <EditItem setData={setData} item={i} itemId={index} data={data} key={index} />)}
      {isAdding && <NewEditor data={data}  setData={setData} close={toggle} />}
      {!isAdding && <Item onClick={toggle}>+</Item>}
    </Editor>
  );
};


const Editor = styled.div`
  width: 500px;
`;


const Item = styled.div`
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  color: #c9d1d9;
  border: 1px solid #30363d;
  background-color: #161b22;
  padding: 14px;
  transition: background-color 0.1s;
  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;

export default EditorSide;