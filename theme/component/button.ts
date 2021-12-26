// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        themeStyle: {
          bg: "#0C0B0B",
          color: "#FFFFFF",
        },
        solid: {
          bg: "#0C0B0B",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
