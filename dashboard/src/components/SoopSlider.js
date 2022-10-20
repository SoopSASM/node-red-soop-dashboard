import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Slider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { mainColor, fontSize, fontColor } from "../assets/DesignOption";
import { sendMessage } from "../utils/socket";
import { calculateHeight, calculateWidth, calculateLeft, calculateTop } from "../assets/DesignOption";

const SliderContainer = styled.div`
  position: absolute;
  left: ${({ layout }) => `${layout.LEFT}px;`}
  top: ${({ layout }) => `${layout.TOP}px;`}
  width: ${({ layout }) => `${layout.WIDTH}px;`}
  height:${({ layout }) => `${layout.HEIGHT}px;`}
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: ${fontColor.light};
  font-family: "Pretendard-Bold";
  font-size: ${fontSize.md};
`;

const SliderLabel = styled.div`
  display: inline-block;
  width: fit-content;
  white-space: nowrap;
  margin-right: 13px;
`;

const WHEN_TYPE = {
  ALWAYS: "always",
  RELEASE: "release",
};

const SoopSlider = ({ currentGroupW, currentGroupWidth, currentGroupH, node, nameVisible }) => {
  const layout = {
    LEFT: calculateLeft(parseInt(node?.widgetX), currentGroupWidth, currentGroupW),
    TOP: calculateTop(parseInt(node?.widgetY), currentGroupH, nameVisible),
    WIDTH: calculateWidth(parseInt(node?.width), currentGroupWidth, currentGroupW),
    HEIGHT: calculateHeight(parseInt(node?.height), currentGroupH, nameVisible),
  };

  const [value, setValue] = useState("0");

  useEffect(() => {
    if (Array.isArray(node?.states) && node?.states[0]) {
      setValue(node?.states[0]?.value);
    }
  }, [node]);

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: mainColor[node?.colorPicking],
      },
    },
  });

  function onChangeCommitted(e, v) {
    if (node?.when == WHEN_TYPE.RELEASE) sendMessage(node?.id, { value: v });
  }

  function onChangeValue(e, v) {
    setValue(v);
    if (node?.when == WHEN_TYPE.ALWAYS) sendMessage(node?.id, { value: v });
  }

  return (
    <>
      <SliderContainer layout={layout}>
        <SliderLabel>{node?.label}</SliderLabel>
        <ThemeProvider theme={muiTheme}>
          <Slider
            value={parseInt(value)}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={node?.min}
            max={node?.max}
            step={parseInt(node?.step)}
            onChange={onChangeValue}
            onChangeCommitted={onChangeCommitted}
          />
        </ThemeProvider>
      </SliderContainer>
    </>
  );
};

export default SoopSlider;
