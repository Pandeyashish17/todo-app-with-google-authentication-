import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/HOC/Navbar"), {
  ssr: false,
});
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Navbar />

      <Component {...pageProps} />
    </StateContext>
  );
}

export default MyApp;
