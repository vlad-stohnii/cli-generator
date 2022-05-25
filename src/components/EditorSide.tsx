import React, { useEffect, useState } from 'react';
import NewEditor from './NewEditor';
import styled from 'styled-components';
import EditItem from './EditItem';
interface Props {
  data: any;
  setDataFromEditor: React.Dispatch<any>;
}



const EditorSide: React.FC<Props> = ({setDataFromEditor}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const toggle = () => {
    setIsAdding(!isAdding)
  }
  useEffect(() => {
    setDataFromEditor(data);
  },[data])
  return (
    <Editor>
      {data.map((i: any, index) => <EditItem setData={setData} item={i} itemId={index} data={data} key={index}/>)}
      {isAdding && <NewEditor data={data} setData={setData} close={toggle}/>}
      {!isAdding && <Item onClick={toggle}>Add frame</Item>}
    </Editor>
  );
};


const Editor = styled.div`
  width: 100%;
`


const Item = styled.div`
  text-align: center;
  background: #464646;
  color: #fff;
  padding: 12px;
  border: none  ;
  border-radius: 5px;
`

export default EditorSide;