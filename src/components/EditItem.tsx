import React, { useState } from 'react';
import styled from 'styled-components';
import NewEditor from './NewEditor';

interface Props {
  item: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  itemId: number;
  data: any;
}

const EditItem: React.FC<Props> = ({ item, setData, data, itemId }) => {
  let renderedItem: any;

  const [isEditing, setIsEditing] = useState(false);

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
      {isEditing && <NewEditor close={() => setIsEditing(false)} data={data} setData={setData} />}
      {!isEditing && <Block>
        <BlockContent>
          {typeof renderedItem === 'string' && renderedItem}
          {typeof renderedItem === 'object' && renderedItem.length === 1 && renderedItem.map((item: any) =>
            <div>{item.map((i: any) => <div>{i}</div>)}</div>)}
          {typeof renderedItem === 'object' && renderedItem.length > 1 && renderedItem.map((item: any) =>
            <Frame>{item.map((i: any) => <div>{i}</div>)}</Frame>)}
        </BlockContent>
        <div onClick={() => setData(() => {
          const newArr = [...data];
          newArr.splice(itemId, 1);
          return newArr;
        })}>Del
        </div>
        {/*<div onClick={() => setIsEditing(true)}>Edit</div>*/}
      </Block>}
    </>
  );
};

const Frame = styled.div`
  border: 1px solid grey;
  margin-bottom: 8px;
`;


const Block = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  width: auto;
  margin-bottom: 8px;
  border: 1px solid #fff;
`;
const BlockContent = styled.div`
  width: 100%;
`;
export default EditItem;