import { Icon, chakra, useColorModeValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export const MButton = (props) => {
  const DoubleArrow = props.left ? ArrowLeftIcon : ArrowRightIcon;
  const [hovered, setHovered] = React.useState(false);
  const hoverColor = useColorModeValue("brand.800", "brand.700");
  const unHoverColor = useColorModeValue("gray.100", "gray.200");
  return (
    <chakra.a
      w={8}
      py={2}
      color="gray.700"
      _dark={{
        color: "gray.200",
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      cursor="pointer"
      textAlign="center"
    >
      {hovered ? (
        <Icon
          as={DoubleArrow}
          boxSize={3}
          cursor="pointer"
          color={hoverColor}
        />
      ) : (
        <Icon
          as={HiDotsHorizontal}
          color={unHoverColor}
          boxSize={4}
          opacity={0.5}
        />
      )}
    </chakra.a>
  );
};
