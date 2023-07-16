
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from '../../../api/axios.js';
import axios from "axios";

const ProfileOverview = () => {
    const [prov,setProvinsi] = useState([])
    const [kota, setKota] = useState([])
    const [alamat,setAlamat] = useState({provinsi: "",kabupaten: "",kecamatan: "",kelurahan:"",rt: "",pendukung: ""})
    const navigate = useNavigate()
    const [errMsg,setErrMsg] = useState('')
    const [confir,setConfir] = useState()
    const [formData,setFormData] = useState({
        nama: '',
        ktp: '',
        jenis_kelamin: 'Laki-Laki',
        no_telepon: '',
        alamat: '',
        paket: 'Premium',
    })

    const provinsi = async() => {
        await axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then(res=>{
          setProvinsi(res.data.provinsi)  
        })
    }

    const kotas = async(id)=>{
        await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`).then(res=>{
            setKota(res.data.kota_kabupaten)
        })
    }

    useEffect(()=>{
        provinsi()
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if (formData.alamat) {
            try {
                await api.post('/jamaah/tambah',formData,{withCredentials: true})
                
            } catch (err) {
                setErrMsg(err.response.data.message)
            }
        }else{
            setConfir("Konfirmasi Penambahan Jamaah ( Klik tambah 1x lagi )")
            setFormData({...formData,alamat: `${alamat.pendukung}${alamat.rt}${alamat.kelurahan}${alamat.kecamatan}${alamat.kabupaten}${alamat.provinsi}`})
        }
        // navigate('/agen/jamaah',{replace:true})
    }

    return (
        <div className="flex w-full flex-col h-screen overflow-auto gap-5 p-5 dark:!bg-navy-900">
            <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1,{replace:true})}>
                    <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
                    <p className="text-md font-bold">Back</p>
                </div>
            </div>
            <div className="w-ful mt-3 flex h-fit sm:w-full flex-col gap-2 lg:grid lg:grid-cols-12">
                <div className="col-span-2">
                </div>
                <div className=" p-5 col-span-8 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
                    <h1 className="text-xl font-bold text-navy-700 dark:text-white">Tambah Jamaah</h1>
                    <p className="text-md font-sm mb-4">Masukkan Informasi Jamaah yang akan di tambah !</p>
                    <div className="flex flex-row justify-between flex-wrap gap-5">
                        <form onChange={()=>setErrMsg('')} onSubmit={handleSubmit}
                             className="flex-grow">
                            <label className="text-sm" >Nama Jamaah</label>
                            <input onChange={e=>setFormData({...formData,nama: e.target.value  })} required placeholder="Nama Jamaah" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >No Ktp</label>
                            <input onChange={e=>setFormData({...formData,ktp: e.target.value})} required placeholder="3242" type="number" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <div className="flex flex-col gap-2 mb-2">
                                <label className="text-sm">Jenis Kelamin</label>
                                <select onChange={e=>setFormData({...formData,jenis_kelamin: e.target.value})} required className="dark:focus:border-white dark:bg-navy-800 transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                    <option value={"Laki-Laki"}>
                                        Laki-Laki
                                    </option>
                                    <option value={"Perempuan"}>
                                        Perempuan
                                    </option>
                                </select>
                            </div>
                            <label className="text-sm" >No Telepon</label>
                            <input onChange={e=>setFormData({...formData,no_telepon: e.target.value})} required placeholder="08112233445566" type="number" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-md font-bold" >Alamat Domisili</label>
                            <div className="pl-5 my-2 ">
                            <label className="text-sm" >Preview Alamat</label>
                            <p className="transition-all sm:w-full my-2 h-fit w-fit  p-3 text-sm " >
                            {`${alamat.pendukung}${alamat.rt}${alamat.kelurahan}${alamat.kecamatan}${alamat.kabupaten}${alamat.provinsi}`}
                            </p>
                                <label className="text-sm" >Provinsi</label>
                                <select onChange={(e)=>{
                                    kotas(e.target.value.split("-")[0])
                                    setErrMsg('')
                                    setConfir('')
                                    setAlamat({...alamat,provinsi: e.target.value.split('-')[1]+"."})
                                }} className="dark:focus:border-white dark:bg-navy-800 transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                    {prov.map((list, index) => {
                                        return <option key={index} value={`${list.id}-${list.nama}`}>{list.nama}</option>
                                    })}
                                </select>
                                <label className="text-sm" >Kabupaten/Kota</label>
                                <select required onChange={(e)=>{
                                     setErrMsg('')
                                     setConfir('')
                                    setAlamat({...alamat,kabupaten: e.target.value+", "})
                                }} className="dark:focus:border-white dark:bg-navy-800 transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                    {kota? 
                                    kota.map((list,index)=>{
                                        return <option key={index} value={`${list.nama}`} >{list.nama}</option>
                                    })    
                                :null}
                                </select>
                                <label className="text-sm" >Kecamatan</label>
                                <input required onChange={(e)=>{
                                     setErrMsg('')
                                     setConfir('')
                                    setAlamat({...alamat,kecamatan: "Kecamatan " + e.target.value +", "})
                                }} placeholder="Kecamatan" type="text" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" />
                                <label className="text-sm" >Kelurahan</label>
                                <input onChange={(e)=>{
                                     setErrMsg('')
                                     setConfir('')
                                    setAlamat({...alamat,kelurahan: e.target.value +", "})
                                }} required placeholder="Kelurahan/Desa" type="text" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" />
                                <label className="text-sm" >Rt/Rw</label>
                                <input onChange={(e)=>{
                                     setErrMsg('')
                                     setConfir('')
                                    setAlamat({...alamat,rt: "Rt " + e.target.value.split("/")[0] + " Rw " + e.target.value.split("/")[1] + ", "})
                                }} required placeholder="00/00" type="text" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                                <label className="text-sm" >Alamat Pendukung</label>
                                <input onChange={(e)=>{
                                     setErrMsg('')
                                     setConfir('')
                                    setAlamat({...alamat,pendukung: e.target.value +", "})
                                }} required placeholder="Jl.Nama Jalam No.00" type="text" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Pilihan Paket</label>
                                <select onChange={e=>setFormData({...formData,paket: e.target.value})} required className="dark:focus:border-white dark:bg-navy-800 transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                    <option value={"Premium"}>
                                        Umroh Premium
                                    </option>
                                    <option value={"Premium Maulid Nabi"}>
                                        Umroh Premium Maulid Nabi
                                    </option>
                                    <option value={"Plus Turki"}>
                                        Umroh Plus Turki
                                    </option>
                                    <option value={"Plus Dubai"}>
                                        Umroh Plus Dubai
                                    </option>
                                    <option value={"Private"}>
                                        Umroh Private
                                    </option>
                                    <option value={"Family"}>
                                        Umroh Family
                                    </option>
                                </select>
                            </div>
                            <p className="text-red-500">{errMsg}</p>
                            <p className="text-navy-800 dark:text-white">{confir}</p>
                            <div className="mt-4">
                                <button type="submit" className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
