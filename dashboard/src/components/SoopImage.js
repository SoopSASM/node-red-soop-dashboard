import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { calculateHeight, calculateWidth, calculateLeft, calculateTop } from "../assets/DesignOption";

const Image = styled.img`
  position: absolute;
  left: ${({ layout }) => `${layout[0]}px;`}
  top: ${({ layout }) => `${layout[1]}px;`}
  width: ${({ layout }) => `${layout[2]}px;`}
  height:${({ layout }) => `${layout[3]}px;`}
  object-fit: ${({ objectFit }) => {
    return `${objectFit};`;
  }}}
  border-radius: ${({ isFull }) => isFull && `10px;`}
`;

const SoopImage = ({ currentGroupW, currentGroupWidth, currentGroupH, node, nameVisible }) => {
  const [currentOption, setCurrentOption] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const layout = [
    calculateLeft(parseInt(node?.widgetX), currentGroupWidth, currentGroupW),
    calculateTop(parseInt(node?.widgetY), currentGroupH, nameVisible),
    calculateWidth(parseInt(node?.width), currentGroupWidth, currentGroupW),
    calculateHeight(parseInt(node?.height), currentGroupH, nameVisible),
  ];
  const isFull = parseInt(node?.width) === currentGroupW && parseInt(node?.height) === currentGroupH ? true : false;

  useEffect(() => {
    if (Array.isArray(node?.states) && node?.states[0]) {
      setCurrentLink(node?.states[0]?.value);
      setCurrentOption("link");
    } else {
      setCurrentOption(node?.option);
      setCurrentLink(node?.link);
    }
  }, [node]);

  switch (currentOption) {
    case "upload":
      return (
        <Image id={node?.id} isFull={isFull} layout={layout} src={`data:image/jpg;base64,${node?.uploads}`} objectFit={node?.fit} />
      );
    case "link":
      return <Image id={node?.id} isFull={isFull} layout={layout} src={currentLink} objectFit={node?.fit} />;
  }
};

export default SoopImage;