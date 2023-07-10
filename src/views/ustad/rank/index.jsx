
import UstadTable from "./components/Table";
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarAgen = () => {

  const navigate = useNavigate()
  const [dataustad,setDataUstad] = useState([''])

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
  },[])    

  return (
    <div>
      <div className="mt-5 flex gap-5 flex-col">
        <UstadTable
          title={"Top 10 Agen"}
          data={dataustad}
          limit={10}
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
