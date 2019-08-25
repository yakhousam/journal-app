import React from "react";
import App, { Container } from "next/app";
import UserContext from "../components/UserContext";



export default class MyApp extends App {
  state = {
    user: null
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
   
    return { pageProps };
  }
  setUser = user => {
    this.setState({ user });
  };
 
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <UserContext.Provider
          value={{
            user: this.state.user,
            setUser: this.setUser
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </Container>
    );
  }
}
