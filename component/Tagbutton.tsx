/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import { Tag } from "@chakra-ui/react";

const Tagbutton = function (props: any) {
  const { addTag, dataid, totalSelect, children } = props;
  const [color, setcolor] = useState(false);

  const UpdateParent = () => {
    addTag({ id: dataid, color });
    if (color) {
      setcolor(false);
    } else {
      setcolor(true);
    }
  };

  // const tagEffect = () => {
  //   if(totalSelect !==3){
  //     if(color){
  //       UpdateParent();
  //     } else {

  //     }
  //   }
  // }

  return (
    <Tag
      bg={color ? "#0C0B0B" : "#F5F5F7"}
      color={color ? "#ffffff" : "#0C0B0B"}
      mr="8px"
      mb="10px"
      padding="10px"
      borderRadius="20px"
      cursor={totalSelect !== 3 || color ? "pointer" : "not-allowed"}
      onClick={() => (totalSelect !== 3 || color ? UpdateParent : null)}
    >
      {children}
    </Tag>
  );
};

export default Tagbutton;
