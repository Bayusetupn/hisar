import Card from "components/card";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import api from "../../../../api/axios.js";
import { IoOpenOutline, IoSearch, IoSearchCircleOutline, } from "react-icons/io5";
import { useNavigate } from "react-router";
import { MdBeenhere } from "react-icons/md";

const ComplexTable = (props) => {
  const navigate = useNavigate()
  const { title, data, limit} = props;

  return (
    <div>
      <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"  }>
      <div class="relative flex items-center justify-between pt-4 flex-wrap" >
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          <div className="flex flex-col">
          <p className="flex-1">
          {title}
          </p>
          </div>
        </div>
      </div>
      <div class="mt-5 overflow-x-auto xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr>
            <th
                className="border-b border-gray-200 w-fit pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No
                </p>
              </th>
              <th
                className="border-b border-gray-200  pr-15 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Total Jamaah
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">

                </p>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto h-9/12">
            {data.sort((a, b)=>{
              return b.total_jamaah - a.total_jamaah
            })
            .slice(0, limit).map((list, index) => {
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white overflow-scroll" key={index} >
                <td className="py-2" >{index + 1}</td>
                <td className="py-2" >{(index+1) == 1? <div className="text-brand-700 dark:text-white flex items-center flex-row gap-1"><MdBeenhere className="w-5 h-5"/><p>{list.nama}</p></div>:list.nama}</td>
                <td className="py-2" >{list.total_jamaah}</td>
                <td className="py-2 flex flex-row">
                  <IoOpenOutline className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" onClick={()=>navigate('/ustad/ustads/profile', {state: {id: list.id}})} />
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default ComplexTable;
