import React, { useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router";
import user from '../../../assets/img/user.jpg'

const Banner = (props) => {
  const navigate = useNavigate()

  const {historyData,ktp,gabung,foto,alamat,no,nama,username} = props;
  const [history, setHistory] = useState(false)
  
  const sli = historyData.slice()
  const datas = sli.reverse()

  return (
    <Card extra={"items-center w-full h-fit p-[16px] bg-cover"}>
      {/* Background and profile */}
        <div className="relative flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={foto? `http://localhost:4000/${foto}` : user} alt="avatar" />
        </div>

      {/* Name and position */}
      <div className="mt-3 mb-3 flex flex-col items-center">
        <div className="flex flex-row" >
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {nama}
        </h4>
        </div>
        <p className="text-base font-normal text-gray-700 dark:text-white">
          {"Ustad"}
        </p>
      </div>

      <div className="w-full border-solid border-y border-grey-700">

      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 w-full flex flex-col items-start gap-2 md:!gap-2">
        
      <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">No Ktp :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{ktp}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Username :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{username}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Alamat :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{alamat}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">No Telepon :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{no}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Bergabung pada tanggal :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{gabung}</p>
        </div>
        <div onClick={() => setHistory(!history)} className="linear mb-2 flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
        <p className="text-md text-white">Riwayat Login</p>
      </div>
      <div className="mt-2 flex w-full items-start flex-col text-navy-700 dark:text-white gap-3 text-md font-bold" >
        {history? datas.slice(0,5).map((data, index) => {
          return <div className="flex flex-row items-center gap-3" key={index}>
            <div className="w-2 h-2 bg-navy-700 dark:bg-white rounded-full"></div>
            <div className="text-sm font-bold text-navy-700 dark:text-white ">
              <p>{data.login.split("/")[0]}</p>
              <p className="text-sm font-normal">{data.login.split("/")[1]}</p>
            </div>
          </div>
        }): null}
      </div>
      </div>
    </Card>
  );
};

export default Banner;
