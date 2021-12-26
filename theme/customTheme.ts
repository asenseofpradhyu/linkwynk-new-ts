import { theme as chakraTheme, extendTheme } from "@chakra-ui/react";
// import { createBreakpoints } from "@chakra-ui/theme-tools"
// import { mode } from "@chakra-ui/theme-tools"

// Component style overrides
// import Button from "./component/button"

// Config
const config = {
  mode: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  cssVarPrefix: "linkwynk",
};

// Fonts
const fonts = {
  ...chakraTheme.fonts,
  body: `'Roboto', sans-serif`,
  heading: `'Baloo_Bhai'`,
};

// Overrides
const overrides = {
  ...chakraTheme,
  fonts,
  config,
  // components: {
  //   Button,
  // }
};

// 3. extend the theme
const customTheme = extendTheme(overrides);

export default customTheme;
