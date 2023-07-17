
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from '../../../api/axios.js';

const ProfileOverview = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ id: location.state.id,jenis_kelamin: location.state.kelamin, ktp: location.state.ktp, nama: location.state.nama, alamat: location.state.alamat, no_telepon: location.state.no_telepon })
    const [errMsg, setErrMsg] = useState()
    const [modal,setModal] = useState(false)

    const edit = async () => {
            if (!formData.ktp || !formData.jenis_kelamin ||!formData.nama || !formData.alamat || !formData.no_telepon) {
                setErrMsg("Form tidak boleh kosong ! ")
                return
            }else{
                if(formData.jenis_kelamin === location.state.kelamin && formData.ktp === location.state.ktp && formData.nama === location.state.nama &&  formData.alamat === location.state.alamat && formData.no_telepon === location.state.no_telepon){
                  setErrMsg("Tidak ada perubahan")
                  return
                }
              }
            try {
                setModal(true)
                await api.post('/jamaah/edit', formData, { withCredentials: true }).then(res => {
                        return navigate(-1)
                    })
            } catch (err) {
                    return setErrMsg(err.response.data.message)
            }
            return navigate(-1)
            }


        return (
            <div className="flex w-full flex-col h-screen overflow-auto gap-5 p-5 dark:!bg-navy-900">
                <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                    <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1, { replace: true })}>
                        <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
                        <p className="text-md font-bold">Back</p>
                    </div>
                </div>
                {modal ?
                    <div className="transition-all fixed inset-0 bg-navy-800 bg-opacity-50 w-screen h-screen flex justify-center items-center" >
                        <div className="rounded-[20px] flex-col w-[300px] gap-3 flex items-center justify-center h-[170px] bg-white ">
                            <div>
                                <p className="text-md text-navy-700 font-medium">Jamaah Berhasil Diedit</p>
                            </div>
                            <div onClick={() => navigate(-1, { replace: true })} className="linear flex flex-row items-center justify-center cursor-pointer rounded-xl px-6 py-2 text-white bg-brand-500" >
                                <p>Kembali</p>
                            </div>
                        </div>
                    </div>
                    : null}
                <div className="w-ful mt-3 flex h-fit sm:w-full flex-col gap-2 lg:grid lg:grid-cols-12">
                    <div className="col-span-2">
                    </div>
                    <div className=" p-5 col-span-8 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
                        <h1 className="text-xl font-bold text-navy-700 dark:text-white">Edit Jamaah</h1>
                        <p className="text-md font-sm mb-4">Masukkan Informasi Jamaah untuk Edit Jamaah !</p>
                        <div className="flex flex-col justify-between flex-wrap gap-1 lg:gap-5 xl:gap-5 xxl:gap-5">
                            <div className="flex-grow">
                                <label className="text-sm" >No Ktp</label>
                                <input defaultValue={formData.ktp} onChange={(e) => {
                                    setFormData({ ...formData, ktp: e.target.value })
                                    setErrMsg('')
                                }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                                <label className="text-sm" >Nama</label>
                                <input defaultValue={formData.nama} onChange={(e) => {
                                    setFormData({ ...formData, nama: e.target.value })
                                    setErrMsg('')
                                }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                                <label className="text-sm">Jenis Kelamin</label>
                                <select defaultValue={formData.jenis_kelamin} onChange={e=>setFormData({...formData,jenis_kelamin: e.target.value})} required className="dark:focus:border-white dark:bg-navy-800 transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                    <option value={"Laki-Laki"}>
                                        Laki-Laki
                                    </option>
                                    <option value={"Perempuan"}>
                                        Perempuan
                                    </option>
                                </select>
                                <label className="text-sm" >Alamat</label>
                                <input defaultValue={formData.alamat} onChange={(e) => {
                                    setFormData({ ...formData, alamat: e.target.value })
                                    setErrMsg('')
                                }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                                <label className="text-sm" >No Telepon</label>
                                <input type="number" defaultValue={formData.no_telepon} onChange={(e) => {
                                    setFormData({ ...formData, no_telepon: e.target.value })
                                    setErrMsg('')
                                }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                                </input>
                            </div>
                            <p className="text-red-500">{errMsg}</p>
                            <div>
                                <button onClick={edit} className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


export default ProfileOverview;
