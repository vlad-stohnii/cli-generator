import React from 'react';
import styled from 'styled-components';

const Dots = () => {
  return (
    <DotsStyle>
      <div style={{background: '#ff5f57'}}/>
      <div style={{background: '#febc2e'}}/>
      <div style={{background: '#28c840'}}/>
    </DotsStyle>
  );
};

const DotsStyle = styled.div`
  display: flex;
  margin-bottom: 8px;
  flex-direction: row;
  gap: 8px;
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`

export default Dots;