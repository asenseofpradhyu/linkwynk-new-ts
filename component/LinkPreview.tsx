/* eslint-disable func-names */
import { Box } from "@chakra-ui/react";
import React from "react";

const LinkPreview = function () {
  return (
    <Box
      className="linkwynk-preview"
      display={{ base: "none", md: "none", lg: "flex" }}
      justifyContent="center"
      marginTop="40px"
    >
      <Box
        className="mobile-design-frame"
        width="auto"
        overflow="hidden"
        maxWidth="350px"
        height="calc(100vh - 240px)"
        padding="10px"
        border="solid #0C0B0B"
        borderWidth="8px 10px 8px 10px"
        borderRadius="40px"
      >
        <Box height="100%" overflow="auto">
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit
            amet.., comes from a line in section 1.10.32.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default LinkPreview;
