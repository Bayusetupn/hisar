
import AgenTable from "./components/Table";
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TableUstad from './components/TableUstad'

const DaftarAgen = () => {

  const navigate = useNavigate()
  const [dataAgen,setDataAgen] = useState([''])
  const [dataUstad,setDataUstad] = useState([''])

  const totalA = async()=>{
    try {
      await api.get('/agen',{ withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const totalU = async()=>{
    try {
      await api.get('/ustad',{ withCredentials: true}).then(res=>{
        setDataUstad(res.data.userData)
      })
    } catch (err) {
      console.log(err)
    }
  }

 

  useEffect(()=>{
    totalU()
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
        <TableUstad
          title={"Top 10 Ustad"}
          data={dataUstad}
          limit={10}
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
