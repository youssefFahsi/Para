import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"], adjustFontFallback: true });

export default function Layout({ children }) {
  const router = useRouter();
 


  return (
    <>
      <title>Para - Manager </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <div className={` min-h-screen ${inter.className}`}>
        <Navbar />

        <div className=" bg-[#f5f5f5] min-h-screen ">{children}</div>
      </div>
    </>
  );
}
