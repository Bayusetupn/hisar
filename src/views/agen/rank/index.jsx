
import AgenTable from "./components/Table";
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarAgen = () => {

  const navigate = useNavigate()
  const [dataAgen,setDataAgen] = useState([''])

  const totalA = async()=>{
    try {
      await api.get('/agen',{ withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
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
      <div className="mt-5 flex gap-5 flex-col">
        <AgenTable
          title={"Top 10 Agen"}
          data={dataAgen}
          limit={10}
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
