import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  toggleEdit: () => void
  setData: React.Dispatch<React.SetStateAction<any[]>>
  data: any
  itemId: number
}

const Popup: React.FC<Props> = ({ toggleEdit, setData, data, itemId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const openToggle = () => setIsOpened(!isOpened);
  return (
    <>
      <Dots onClick={openToggle}>
        <div />
        <div />
        <div />
      </Dots>
      {isOpened && <Pop>
        <Button onClick={toggleEdit}>Edit</Button>
        <Button onClick={() => setData(() => {
          const newArr = [...data];
          newArr.splice(itemId, 1);
          return newArr;
        })}>Delete</Button></Pop>}
      {isOpened && <Background onClick={openToggle}/>}
    </>
  );
};

const Dots = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;

  div {
    margin-right: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

const Button = styled.button`
  padding: 4px;
  font-size: 14px;
  width: 70px;
  background: #00d4ff;
  border: 0;
  color: #081d33;
  transition: background-color 0.1s;

  &:first-child {
    border-right: 1px solid #081d33;
  }

  &:hover {
    background-color: #fff;
  }
`;

const Pop = styled.div`
  z-index: 99;
  border: 1px solid #4c5996;
  position: absolute;
  display: flex;
  top: 30px;
  right: -1px;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  width: 100vw;
  height: 100vh;
`;

export default Popup;