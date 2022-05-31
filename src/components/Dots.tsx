import React from 'react';
import styled from 'styled-components';

const Dots = () => {
  return (
    <DotsStyle>
      <div style={{background: '#ff5f57', marginLeft: 12}}/>
      <div style={{background: '#febc2e'}}/>
      <div style={{background: '#28c840'}}/>
    </DotsStyle>
  );
};

const DotsStyle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 34px;
  flex-direction: row;
  div {
    width: 12px;
    margin-left: 8px;
    height: 12px;
    border-radius: 50%;
  }
`

export default Dots;