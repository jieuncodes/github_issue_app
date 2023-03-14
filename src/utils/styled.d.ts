// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    green: {
      darker: string;
      lighter: string;
    },
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    },
    white: {
      veryDark: string;
      lighter: string;
      darker: string;
    },
    title: string;
    screenPadding: {
      pc: number;
      tablet: number;
      mobile: number;
    },
  }
}