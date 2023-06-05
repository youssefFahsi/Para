import LayoutComponent from '@/components/LayoutComponent'
import Table from '@/components/Table';
import { handleApiResponse } from '@/helper/apiUtils';
import { getGammes } from '@/helper/service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Gamme = () => {
   const router = useRouter()
   const [dataTable, setdataTable] = useState([])
     useEffect(() => {
       getDataGamme()
     }, [])
     


    const getDataGamme = async () => {
       // setLoadingTable(true);
        const res = await getGammes();
    
        if (res.status === 200 || res.status === 201) {
            setdataTable(res.data);
         // setLoadingTable(false);
        } else {
         // setLoadingTable(false);
    
          handleApiResponse(res, router);
        }
      };
      const headersTable = [
        
        {
          key: "title",
          label: "Titre",
          type: "string",
          sorting: true,
    
          styles: {
            minWidth: "80px",
            width: "auto",
            textAlign: "center",
          },
        },
    
        
      ];
  return (
    <LayoutComponent title={"Gamme"}>
         <div className="mt-2 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-10">
            <div className='sm:col-span-5'>  
            <Table headers={headersTable} data={dataTable} />             
            </div>

         </div>
       
    </LayoutComponent>
  )
}

export default Gamme