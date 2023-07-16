import Banner from "./components/Banner";
import { IoMdArrowRoundBack } from "react-icons/io";
import ComplexTable from "./components/ComplexTable";
import { useState,useEffect } from "react";
import api from '../../../api/axios.js';
import { useLocation, useNavigate } from "react-router";


const ProfileOverview = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [dataAgen, setdataAgen] = useState({id: "",no_ktp:"",bergabung: "",foto: "",nama: "", alamat: "", no_telepon: "", username: ""})
  const [dataJamaah,setdataJamaah] = useState([''])
  
  const agen = async() =>{
    try {
      await api.get(`/agen/${location.state.id}`, {withCredentials: true}).then((res)=>{
        setdataAgen({id: res.data.data.id,no_ktp: res.data.data.no_ktp,bergabung: res.data.data.dibuat_pada,foto: res.data.data.foto,nama: res.data.data.nama, alamat: res.data.data.alamat, no_telepon: res.data.data.no_telepon, username: res.data.data.username})
      })
      .catch(err=>{
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const jamaah = async()=>{
    try {
      await api.post('/jamaah',{id: location.state.id},{withCredentials: true}).then((res)=>{
        setdataJamaah(res.data.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    agen()
    jamaah()
  },[])

  return (
    <div className="flex w-full flex-col h-screen overflow-auto gap-5 p-5 dark:!bg-navy-900">
      <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
          <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={()=>navigate(-1)}>
            <IoMdArrowRoundBack className="h-7 w-7 mr-2"/>
            <p className="text-md font-bold">Back</p>
          </div>
      </div>
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-3 lg:!mb-0">
          <Banner ktp={dataAgen.no_ktp} gabung={dataAgen.bergabung} foto={dataAgen.foto} nama={dataAgen.nama} alamat={dataAgen.alamat} no={dataAgen.no_telepon} username={dataAgen.username}/>
        </div>
        <div className="col-span-9">
        <div className="flex flex-col gap-5">
          <ComplexTable
          title={"Daftar Jamaah"}
          data={dataJamaah}
          nama={dataAgen.nama}
          limit={dataJamaah.length}
          />
        </div>
        </div>
      </div>
      </div>
  );
};

export default ProfileOverview;
