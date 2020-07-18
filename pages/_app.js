import App from "next/app";
import { ThemeProvider } from "styled-components";
import { Background } from "../components";

const theme = {
  colors: {
    background: "#f0bf4a",
    text: "#000101",
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Background />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
