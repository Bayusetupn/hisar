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
      <div class="relative flex items-center justify-between pt-4">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <div>
          <p onClick={() => navigate('/admin/jamaah', { replace: true })} className=" cursor-pointer font-bold linear mt-2 rounded-xl bg-brand-500 py-[12px] px-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            {side}
          </p>
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
                {/* <td className="py-2 flex flex-row gap-2">
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
                  }} /></td> */}
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
