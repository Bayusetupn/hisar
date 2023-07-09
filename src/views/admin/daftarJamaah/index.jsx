
import { IoAdd} from "react-icons/io5";

import JamaahTable from "./components/Table";

import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarUstad = () => {

  const navigate = useNavigate()
  const [dataJamaah,setdataJamaah] = useState([''])
  const [totalJamaah,setTotalJamaah] = useState()

  const totalJ = async()=>{
    try {
      await api.get('/jamaah/all',{ withCredentials: true}).then(res=>{
        setdataJamaah(res.data.dataJamaah)
        setTotalJamaah(res.data.dataJamaah.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    
    totalJ()
  },[])
    
  
  
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">

        {/* Complex Table , Task & Calendar */}

        <JamaahTable
          title={"Cari Jamaah"}
          data={dataJamaah}
          limit={totalJamaah}
          side={""}
          to={'/admin/agen/edit'}
        />
      </div>
    </div>
  );
};

export default DaftarUstad;
