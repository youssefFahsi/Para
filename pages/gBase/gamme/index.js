import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import React from 'react'
import Gamme from './Gamme';

const index = () => {
    const items = [
        { label: "G.Base", url: "#" },
        { label: "Gamme", url: "#" },
      ];
  return (
    <Layout>
    <Breadcrumb items={items} />
     <Gamme />
  </Layout>
  )
}

export default index