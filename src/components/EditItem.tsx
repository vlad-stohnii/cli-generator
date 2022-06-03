import React, { useState } from 'react';
import styled from 'styled-components';
import EditEditor from './EditEditor';
import Popup from './Popup';
import { Data, DataObject } from './types';

interface Props {
  item: DataObject;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  itemId: number;
  data: Data;
}

const EditItem: React.FC<Props> = ({ item, setData, data, itemId }) => {
  let renderedItem: any;
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  if (typeof item.object === 'string') {
      renderedItem = '~ ' + item.object;
  } else {
    renderedItem = [];
    item.object.forEach((i) => {
      renderedItem.push(i.frame);
    });
  }
  return (
    <>
      {isEditing && <EditEditor close={toggleEdit} data={data} item={item} itemId={itemId} setData={setData} />}
      {!isEditing && <Block>
        <BlockContent>
          {typeof renderedItem === 'string' && renderedItem}
          {typeof renderedItem === 'object' && renderedItem.length === 1 && renderedItem.map((item: any, index: number) =>
            <div key={index}>
              {item.map((i: any, key: number) => key <= 2 && <div key={key}>{i}{key === 2 && item.length > 3 && '...'}</div>)}
            </div>)}
          {typeof renderedItem === 'object' && renderedItem.length > 1 && renderedItem.map((item: any, index: number) =>
            <Frame key={index}>
              {item.map((i: any, key: number) => key <= 2 && <div key={key}>{i}{key === 2 && '...'}</div>)}
            </Frame>)}
        </BlockContent>
        <Popup toggleEdit={toggleEdit} data={data} setData={setData} itemId={itemId} />
      </Block>}
    </>
  );
};

const Frame = styled.div`
  background-color: #1a3e6c;
  padding: 4px;
  margin-bottom: 8px;
`;


const Block = styled.div`
  white-space: break-spaces;
  word-break: break-all;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: auto;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #06182c;
`;
const BlockContent = styled.div`
  width: 100%;
  align-self: center;
  margin: 8px 0 8px 8px;
`;
export default EditItem;