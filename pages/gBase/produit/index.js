import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/Layout";
import React from "react";

const index = () => {
  const items = [
    { label: "G.Base", url: "#" },
    { label: "Produit", url: "#" },
  ];
  return (
    <Layout>
      <Breadcrumb items={items} />
      
    </Layout>
  );
};

export default index;
