import React, { useState } from 'react';
import styled from 'styled-components';
import EditEditor from './EditEditor';
import Popup from './Popup';
import { ConsoleObjectType, ConsoleObjects } from './types';
import DropDown from './DropDown';
import { options } from '../constants';

interface Props {
  item: ConsoleObjectType;
  setData: React.Dispatch<React.SetStateAction<ConsoleObjects>>;
  itemId: number;
  data: ConsoleObjects;
}

const EditItem: React.FC<Props> = ({ item, setData, data, itemId }) => {
  const [isEditing, setIsEditing] = useState(false);
  let renderedItem: string | string[] | null = null;
  const changeTiming = (ms: number, index: number) => {
    let tempdata = [...data];
    let element = tempdata[itemId];
    if('timing' in element) {
      element.timing = ms;
    }
    setData([...tempdata])
  }
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  if ('input' in item) {
    renderedItem = '~ ' + item.input;
  }
  if ('output' in item) {
    renderedItem = item.output;
  }
  if ('frames' in item) {
    renderedItem = item.frames.map((frame) => frame.value);
  }
  return (
    <>
      {isEditing && <EditEditor close={toggleEdit} data={data} item={item} itemId={itemId} setData={setData} />}
      {renderedItem && !isEditing && <Block>
        <BlockContent>
          {typeof renderedItem === 'string' && <CropLine>{renderedItem}</CropLine>}
          {typeof renderedItem === 'object' && renderedItem.map((item, index: number) =>
            <Frame key={index}>
              <CropLine>{item}</CropLine>
              {/*{item.map((i: any, key: number) => key <= 2 && <div key={key}>{i}{key === 2 && '...'}</div>)}*/}
            </Frame>)}
        </BlockContent>
        {'timing' in item && <DropDown options={options} setItem={changeTiming} index={itemId} selected={item.timing}/>}
        <Popup toggleEdit={toggleEdit} setData={setData} itemId={itemId} />
      </Block>}
    </>
  );
};

const Frame = styled.div`
  background-color: #1a3e6c;
  padding: 4px;
  margin-bottom: 8px;
  margin-right: 8px;
`;


const Block = styled.div`
  white-space: break-spaces;
  word-break: break-all;
  height: 100%;
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
const CropLine = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  max-height: 3.9em;
`
export default EditItem;