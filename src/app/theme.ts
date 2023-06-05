import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  disableTransitionOnChange: true,
};

const colors = {
  brand: {
    100: "#9054F7",
    // ...
    900: "#9054F7",
  },
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
