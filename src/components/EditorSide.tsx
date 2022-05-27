import React, { useEffect, useState } from 'react';
import NewEditor from './NewEditor';
import styled from 'styled-components';
import EditItem from './EditItem';

interface Props {
  data: any;
  setDataFromEditor: React.Dispatch<any>;
}


const EditorSide: React.FC<Props> = ({ setDataFromEditor }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const toggle = () => {
    setIsAdding(!isAdding);
  };
  useEffect(() => {
    setDataFromEditor(data);
  }, [data]);
  return (
    <Editor>
      {data.map((i: any, index) => <EditItem setData={setData} item={i} itemId={index} data={data} key={index} />)}
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
  cursor: pointer;
  color: #c9d1d9;
  border: 1px solid #30363d;
  background-color: #161b22;
  padding: 12px;
  transition: background-color 0.1s;
  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;

export default EditorSide;