import AgenTable from "./components/Table";
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";

const DaftarAgen = () => {

  const [dataAgen,setDataAgen] = useState([''])
  const [totalAgen,setTotalAgen] = useState()

  const totalA = async()=>{
    try {
      await api.get('/ustad',{ withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
        setTotalAgen(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

 

  useEffect(()=>{
    
    totalA()
  },[])
    

  return (
    <div>
      <div className="mt-5 grid grid-cols-1  gap-5 xl:grid-cols-1">
        <AgenTable
          title={"Cari Ustad"}
          data={dataAgen}
          limit={totalAgen}
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
