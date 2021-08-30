import "../../styles/tailwind.css";
import "../../styles/icons.css";

import Navbar from "../components/Navbar";

import { AppProps } from "next/app";
import Axios from "axios";
import { Fragment } from "react";
import { useRouter } from "next/router";

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <Fragment>
      {!authRoute &&<Navbar />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
