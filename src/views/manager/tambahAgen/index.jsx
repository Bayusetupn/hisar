
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import api from '../../../api/axios.js';
import axios from "axios";
const ProfileOverview = () => {
    const [prov,setProvinsi] = useState([])
    const [kota, setKota] = useState([])
    const [kelurahan,setKelurahan] = useState([])
    const [alamat,setAlamat] = useState({provinsi: "",kabupaten: "",kecamatan: "",kelurahan:"",rt: "",pendukung: ""})
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({no_ktp: "", nama: '', alamat: "", no_telepon: '', username: '', password: '' })
    const [konfir, setKonfir] = useState('')
    const [errMsg, setErrMsg] = useState()
    const [confir,setConfir] = useState()

    const tambah = async () => {
            if(formData.alamat){
                if (!formData.nama || !formData.no_telepon || !formData.username || !formData.password) {
                    setErrMsg("Form tidak boleh kosong ! ")
                    return
                } else if (formData.password.length < 8) {
                    setErrMsg("Password minimal 8 karakter !")
                    return
                } else if (formData.password !== konfir) {
                    setErrMsg("Password dan Konfirmasi Password tidak sama !")
                    return
                }
                else if (formData.no_telepon < 10) {
                    setErrMsg("Masukkan nomer telepon yang valid !")
                    return
                } else {
                    try {
                        await api.post('/agen/create', formData, { withCredentials: true }).then(res => {
                            return navigate('/manager/agen', { replace: true })
                        })
                    } catch (err) {
                        setErrMsg(err.response.data.message)
                        return
                    }
            }
            }else{
                if (!formData.nama || !formData.no_telepon || !formData.username || !formData.password) {
                    setErrMsg("Form tidak boleh kosong ! ")
                    return
                } else if (formData.password.length < 8) {
                    setErrMsg("Password minimal 8 karakter !")
                    return
                } else if (formData.password !== konfir) {
                    setErrMsg("Password dan Konfirmasi Password tidak sama !")
                    return
                }
                else if (formData.no_telepon < 10) {
                    setErrMsg("Masukkan nomer telepon yang valid !")
                    return
                } else{
                    setConfir("Konfirmasi Pembuatan Agen ( Klik 1x lagi )")
                }
            }
    }

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

    const lurah = async(id)=>{
        await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`).then(res=>{
            setKelurahan(res.data.kelurahan)
        })
    }

    useState(()=>{
        provinsi() 
    },[])

    

    return (
        <div className="flex w-full flex-col h-screen overflow-scroll gap-5 p-5 dark:!bg-navy-900">
            <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1, { replace: true })}>
                    <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
                    <p className="text-md font-bold">Back</p>
                </div>
            </div>
            <div className="w-ful mt-3 flex h-fit sm:w-full flex-col gap-2 lg:grid lg:grid-cols-12">
                <div className="col-span-2">
                </div>
                <div className=" p-5 col-span-8 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
                    <h1 className="text-xl font-bold text-navy-700 dark:text-white">Tambah Agen</h1>
                    <p className="text-md font-sm mb-4">Masukkan Informasi Agen yang akan di tambah !</p>
                    <div className="flex flex-row justify-between flex-wrap gap-5">
                        <div className="flex-grow">
                            <label className="text-sm" >No Ktp</label>
                            <input placeholder="22032203" type="number" onChange={(e) => {
                                setFormData({ ...formData, no_ktp: e.target.value })
                                setErrMsg('')
                                setConfir('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Nama</label>
                            <input placeholder="Nama Agen" onChange={(e) => {
                                setFormData({ ...formData, nama: e.target.value })
                                setErrMsg('')
                                setConfir('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-md font-bold" >Alamat Domisili</label>
                            <div className="pl-5 my-2 ">
                            <label className="text-sm" >Preview Alamat</label>
                            <p className="transition-all sm:w-full my-2 h-fit w-fit  p-3 text-sm " >
                            {`${alamat.pendukung}${alamat.rt}${alamat.kelurahan}${alamat.kecamatan}${alamat.kabupaten}${alamat.provinsi}`}
                            </p>
                                <label className="text-sm" >Provinsi</label>
                                <select onChange={(e)=>{
                                    console.log(e.target.value.split("-")[1])
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
                            <label className="text-sm" >No Telepon</label>
                            <input placeholder="08511223344" type="number" onChange={(e) => {
                                setFormData({ ...formData, no_telepon: e.target.value })
                                setErrMsg('')
                                setConfir('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                        </div>
                        <div className="flex-grow flex-4" >
                            <label className="text-sm" >Username</label>
                            <input placeholder="Username" onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value })
                                setErrMsg('')
                                setConfir('')
                            }} className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Password</label>
                            <input type="password" onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                                setErrMsg('')
                                setConfir('')
                            }} placeholder="Password" className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Konfirmasi Password</label>
                            <input type="password" onChange={(e) => setKonfir(e.target.value)} placeholder="Ulangi Password" className="dark:focus:border-white sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border focus:border-4 transition-all border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none" >
                            </input>
                            <p className="text-red-500">{errMsg}</p>
                            <p className="dark:text-white text-navy-800">{confir}</p>
                            <div className="mt-4">
                                <button onClick={()=>{
                                    setFormData({...formData,alamat: `${alamat.pendukung}${alamat.rt}${alamat.kelurahan}${alamat.kecamatan}${alamat.kabupaten}${alamat.provinsi}`})
                                    tambah()
                                }} className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
