import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  blue: "#1DA1F2",
  black: "#14171A",
  darkgrey: "#657786",
  lightgrey: "#AAB8C2",
  lightgrey2: "#E1E8ED",
  lightgrey3: "#F5F8FA",
  white: "#fff",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)"
};

const StyledPage = styled.div`
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  
  body {
    background: ${theme.lightgrey2};
    height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 1.2;
    font-family: 'Lato', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
