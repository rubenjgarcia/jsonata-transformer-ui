import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Head from "next/head";

function JSONTransformerApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JSON transformer with JSONata</title>
        <meta name="description" content="JSON transformer with JSONata." />
        <link rel="icon" href="favicon.ico" />
        <meta property="og:locale" content="en-GB" />
      </Head>
      <Nav />
      <ToastContainer
        theme="light"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default JSONTransformerApp;
