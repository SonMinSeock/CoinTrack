import { useState } from "react";
import styled from "styled-components";

interface ModeProps {
  mode: boolean;
  setMode: Function;
}

function Mode({ mode, setMode }: ModeProps) {
  const Container = styled.div`
    position: absolute;
    top: 32px;
    left: 20px;
  `;
  const ThemeModeBtn = styled.button`
    height: 30px;
    border-radius: 50px;
    border: none;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
    cursor: pointer;
  `;

  const changeMode = () => setMode((prev: boolean) => !prev);

  return (
    <Container>
      <ThemeModeBtn onClick={changeMode}>
        {mode ? "Dark Mode" : "Light Mode"}
      </ThemeModeBtn>
    </Container>
  );
}

export default Mode;
