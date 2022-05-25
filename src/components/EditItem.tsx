import React, { useState } from 'react';
import styled from 'styled-components';
import EditEditor from './EditEditor';
import Popup from './Popup';

interface Props {
  item: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  itemId: number;
  data: any;
}

const EditItem: React.FC<Props> = ({ item, setData, data, itemId }) => {
  let renderedItem: any;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  if (typeof item === 'string') {
    const com = item.match(/<c>((?!<cons>|<res>|<c>).)*<c>/g);
    if (com)
      renderedItem = '~ ' + com[0].split('<c>')[1];
  } else {
    renderedItem = [];
    item.forEach((i: any) => {
      let temp: any[] = [];
      i.forEach((text: any) => {
        const consoleText = text.match(/<cons>((?!<c>|<res>|<cons>).)*<cons>/g);
        if (consoleText) {
          temp.push(consoleText[0].split('<cons>')[1]);
        }
      });
      renderedItem.push(temp);
    });
  }
  return (
    <>
      {isEditing && <EditEditor close={toggleEdit} data={data} item={item} itemId={itemId} setData={setData} />}
      {!isEditing && <Block>
        <BlockContent>
          {typeof renderedItem === 'string' && renderedItem}
          {typeof renderedItem === 'object' && renderedItem.length === 1 && renderedItem.map((item: any, index: number) =>
            <div key={index}>{item.map((i: any, key: number) => <div key={key}>{i}</div>)}</div>)}
          {typeof renderedItem === 'object' && renderedItem.length > 1 && renderedItem.map((item: any, index: number) =>
            <Frame key={index}>{item.map((i: any, key: number) => <div key={key}>{i}</div>)}</Frame>)}
        </BlockContent>
        <Popup toggleEdit={toggleEdit} data={data} setData={setData} itemId={itemId} />
      </Block>}
    </>
  );
};

const Frame = styled.div`
  border: 1px solid grey;
  background-color: #1a3e6c;
  padding: 4px;
  margin-right: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;


const Block = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  width: auto;
  margin-bottom: 8px;
  border: 1px solid #8095ff;
  background-color: #0c2e4e;
`;
const BlockContent = styled.div`
  width: 100%;
`;
export default EditItem;