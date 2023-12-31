import { IoArrowBack, IoBackspace } from "react-icons/io5";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import ComplexTable from "./components/ComplexTable";
import { useState,useEffect } from "react";
import api from '../../api/axios.js';
import { useLocation, useNavigate } from "react-router";


const ProfileOverview = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [history,setHistoryData] = useState([])
  const [dataAgen, setdataAgen] = useState({nama: "",foto: "",no_ktp: "",bergabung: "", alamat: "", no_telepon: "", username: ""})
  const [dataJamaah,setdataJamaah] = useState([''])
  
  const agen = async() =>{
    try {
      await api.get(`/ustad/${location.state.id}`, {withCredentials: true}).then((res)=>{
        setdataAgen({nama: res.data.data.nama,no_ktp: res.data.data.no_ktp,bergabung: res.data.data.dibuat_pada,foto: res.data.data.foto, alamat: res.data.data.alamat, no_telepon: res.data.data.no_telepon, username: res.data.data.username})
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

  const loginHistory = async()=>{
    try {
      await api.post('/riwayat/login',{id: location.state.id},{withCredentials: true}).then(res=>{
        setHistoryData(res.data.data)
      })
    } catch (err) {
      
    }
  }

  useEffect(()=>{
    agen()
    jamaah()
    loginHistory()
  },[])

  return (
    <div className="flex w-full flex-col h-screen gap-5 p-5 dark:!bg-navy-900">
      <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
          <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={()=>navigate(-1)}>
            <IoMdArrowRoundBack className="h-7 w-7 mr-2"/>
            <p className="text-md font-bold">Back</p>
          </div>
      </div>
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-3 lg:!mb-0">
          <Banner historyData={history} ktp={dataAgen.no_ktp} gabung={dataAgen.bergabung} nama={dataAgen.nama} foto={dataAgen.foto} alamat={dataAgen.alamat} no={dataAgen.no_telepon} username={dataAgen.username}/>
        </div>
        <div className="col-span-9">
        <div className="flex flex-col gap-5">
          <ComplexTable
          title={"Daftar Jamaah"}
          data={dataJamaah}
          limit={dataJamaah.length}
          nama={dataAgen.nama}
          />
        </div>
        </div>
      </div>
      </div>
  );
};

export default ProfileOverview;
