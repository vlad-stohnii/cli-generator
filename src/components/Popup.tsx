import React, { useState } from 'react';
import styled from 'styled-components';
import { ConsoleObjects } from './types';

interface Props {
  toggleEdit: () => void
  setData: React.Dispatch<React.SetStateAction<ConsoleObjects>>
  itemId: number
}

const Popup: React.FC<Props> = ({ toggleEdit, setData, itemId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const openToggle = () => setIsOpened(!isOpened);
  return (
    <>
      <Container onClick={openToggle}>
        <Dots>
          <div />
          <div />
          <div />
        </Dots>
        {isOpened && <Pop>
          <Button onClick={toggleEdit}>Edit</Button>
          <Button onClick={() => setData((data) => {
            const newArr = [...data];
            newArr.splice(itemId, 1);
            return newArr;
          })}>Delete</Button></Pop>}
      </Container>
      {isOpened && <Background onClick={openToggle}/>}
    </>
  );
};


const Container = styled.div`
  width: 40px;
  min-width: 40px;
  position: relative;
  height: 40px;
  margin: 4px 4px 4px 0;
  align-items: center;
  border-radius: 2px;
  background-color: #071e38;
  cursor: pointer;
  display: flex;
  justify-content: center;
`

const Dots = styled.div`
  height: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  div {
    width: 2px; 
    height: 2px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

const Button = styled.button`
  font-size: 14px;
  width: 120px;
  border: 0;
  color: #c9d1d9;
  text-align: left;
  padding: 4px 8px 4px 16px;
  background-color: #161b22;
  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`;

const Pop = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  border: 1px solid #30363d;
  background-color: #161b22;
  border-radius: 6px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: 0;
`;
const Background = styled.div`
  position: fixed;
  cursor: auto;
  top: 0;
  left: 0;
  z-index: 98;
  width: 100vw;
  height: 100vh;
`;

export default Popup;