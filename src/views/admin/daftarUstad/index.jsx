
import { IoAdd, IoPeople} from "react-icons/io5";
import {  MdVerifiedUser } from "react-icons/md";


import Widget from "components/widget/Widget";
import AgenTable from "../default/components/Table";
import DailyTraffic from "../default/components/DailyTraffic";

import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarUstad = () => {

  const navigate = useNavigate()
  const [dataUstad,setdataUstad] = useState([''])
  const [totalAgen,setTotalAgen] = useState()

  const totalU = async()=>{
    try {
      await api.get('/ustad',{ withCredentials: true}).then(res=>{
        setdataUstad(res.data.userData)
        setTotalAgen(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    
    totalU()
  },[])
    
  
  
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">

        {/* Complex Table , Task & Calendar */}

        <AgenTable
          title={"Cari Ustad"}
          data={dataUstad}
          limit={totalAgen}
          side={<div onClick={()=>navigate('/admin/plusustad')} className="flex flex-direction-row"><IoAdd className="h-6 w-6 mr-2"/><p>Tambah Ustad</p></div>}
          to={'/admin/agen/edit'}
        />
      </div>
    </div>
  );
};

export default DaftarUstad;
