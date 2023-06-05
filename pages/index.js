import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <Layout
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    
    </Layout>
  );
}
