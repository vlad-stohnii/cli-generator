import React from 'react';
import styled from 'styled-components';

const PlayButton = () => {
  return (
    <Play>
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           x='0px'
           y='0px'
           viewBox='0 0 386.972 386.972' xmlSpace='preserve'>
        <path d='M25.99,0v386.972l334.991-193.486L25.99,0z M55.99,51.972l245.009,141.514L55.99,335V51.972z' />
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>
    </Play>
  );
};

const Play = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default PlayButton;