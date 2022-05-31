import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  options: number[];
  setItem: (ms: number, key: number) => void;
  index: number;
  selected: number;
}

const DropDown: React.FC<Props> = ({ options, setItem, index, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledDropDown>
      {isOpen && <DropBg onClick={() => setIsOpen(false)} />}
      <DropContent>
        <OpenButton onClick={() => setIsOpen(true)}>
          {selected}
        </OpenButton>
        {isOpen && <DropOptions>{
          options.map((option, key) => <Option key={key} onClick={() => {
            setIsOpen(false);
            setItem(option, index);
          }}>{option}</Option>)
        }
        </DropOptions>}
      </DropContent>
    </StyledDropDown>
  );
};

const DropBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const DropContent = styled.div`
  position: relative;
  margin: 4px;
  width: 40px;
  height: 40px;
`;

const DropOptions = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  border: 1px solid #30363d;
  background-color: #161b22;
  border-radius: 2px;
  position: absolute;
  top: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const OpenButton = styled.button`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 2px;
  color: #c9d1d9;
  background-color: #071e38;
  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`

const Option = styled.button`
  height: 100%;
  border: none;
  width: 80px;
  border-radius: 2px;

  font-size: 14px;
  border: 0;
  color: #c9d1d9;
  text-align: left;
  padding: 4px 8px 4px 16px;
  background-color: #161b22;
  &:hover {
    color: #ffffff;
    background-color: #1f6feb;
  }
`

const StyledDropDown = styled.div`
`;

export default DropDown;