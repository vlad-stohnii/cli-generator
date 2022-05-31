import React from 'react';
import styled from 'styled-components';

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const Import:React.FC<Props> = ({setFile}) => {
  return (
    <>
      <Label htmlFor={'hidden'}>Import</Label>
      <HiddenInput id={'hidden'} onChange={(e) => {
        e.target.files && setFile(e.target.files[0])
      }} type={'file'} accept={".txt"}/>
    </>
  );
};

const Label = styled.label`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  color: #081d33;
  text-align: center;
  line-height: 40px;
`


const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  background: none;
`

export default Import;