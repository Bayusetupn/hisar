import Card from "components/card";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import api from "../../../../api/axios.js";
import { IoOpenOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

const ComplexTable = (props) => {
  const [search,setSearch] = useState()
  const navigate = useNavigate()
  const { title, data, limit, side, klik} = props;


  useEffect(()=>{
    setSearch('')
  },[])

  return (
    <div>
      <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"  }>
      <div class="relative flex items-center justify-between pt-4 flex-wrap" >
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          <div className="flex flex-col">
          <p className="flex-1">
          {title}
          </p>
          <div className="flex items-center mt-2" >
            <IoSearch className="absolute ml-2 w-5 h-5"/>
          <input onChange={(e)=>setSearch(e.target.value)} className="pl-8 my-2 text-md font-medium text-black dark:focus:border-white transition-all sm:w-full flex h-10 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-gray-900 bg-white/0 text-sm outline-none focus:border-3" />
          </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="mt-5 overflow-x-auto">
        <table className="w-full">
        <thead>
            <tr>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Ktp
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Jenis Kelamin
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Alamat Domisili
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Telepon
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Paket
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Di Daftarkan
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Bergabung pada Tanggal
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Berangkat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Keterangan
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">

                </p>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-9/12">
          {data? data.filter(nama=>{
              return !search || search.toLowerCase() === ''? nama : nama.nama.toLowerCase().includes(search)
            }).slice(0, limit).map((list, index) => {
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white" key={index} >
                <td className="py-2">{list.ktp}</td>
                <td className="py-2" >{list.nama}</td>
                <td className="py-2" >{list.jenis_kelamin}</td>
                <td className="py-2 pr-5" >{list.alamat}</td>
                <td className="py-2" >{list.no_telepon}</td>
                <td className="py-2" >{list.paket}</td>
                <td className="py-2" >{list.daftarkan}</td>
                <td className="py-2" >{list.dibuat_pada}</td>
                <td className="py-2" >{list.berangkat ? list.berangkat : "Belum ditentukan"}</td>
                <td className="py-2" >{list.dp ? "Lunas" : "Belum Lunas"}</td>
                <td className="py-2 flex flex-row gap-2">
                  <IoOpenOutline className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" onClick={() => {
                    navigate('profile', {
                      state: {
                        ids: list.id,
                        berangkat: list.berangkat,
                        ktp: list.ktp,
                        nama: list.nama,
                        jenis_kelamin: list.jenis_kelamin,
                        alamat: list.alamat,
                        no_telepon: list.no_telepon,
                        paket: list.paket,
                        dibuat: list.dibuat_pada,
                        berangkat: list.berangkat,
                        dp: list.dp,
                        di_daftarkan: list.userId

                      }
                    })
                  }} /></td>
              </tr>
            }) : ""}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default ComplexTable;
