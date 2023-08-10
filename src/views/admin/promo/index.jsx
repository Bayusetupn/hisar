import Card from "components/card";
import placeholder from "../../../assets/img/Belum di Upload.jpg";
import { Image, Key } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { url } from "../../../api/url.js";
import api from "../../../api/axios.js";
import { IoMdTrash } from "react-icons/io";
import { MdUpload } from "react-icons/md";

const Promo = () => {
  const [promo, SetPromo] = useState("");
  const [promoImg, SetPromoImg] = useState("");
  const [daftarPromo, setDaftarPromo] = useState([""]);
  let formData = new FormData()
  const [modal,setmodal] = useState(false)
  const [i,setI] = useState()
  const [up,setUp] = useState(false)
  
  formData.append('promo',promo)

  const getPromo = async () => {
    try {
      await api.get("/promo", { withCredentials: true }).then((res) => {
        setDaftarPromo(res.data.data);
      });
    } catch (err) {}
  };

  const addPromo = async()=>{
    try {
      await api.post('/upload/promo',formData,{withCredentials : true}).then(()=>{
        alert("Berhasil Membuat Promo")
        getPromo()
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deletePromo = async(ids)=>{
    try {
      await api.post('/delete/promo',{id:ids},{withCredentials:true}).then(()=>{
        getPromo()
      })
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getPromo();
  }, []);

  return (
    <div className="mt-3 grid h-full grid-rows-1 gap-5">
      <Card extra={"w-full h-fit px-6 pb-6 sm:overflowx-auto"}>
        <div class="relative flex flex-col items-start justify-between pt-4">
          <div class="text-xl font-bold text-navy-700 dark:text-white">
            <p>Upload Promo</p>
          </div>
          <div className="my-3 flex flex-row flex-wrap gap-3">
            <img
              src={promoImg ? promoImg : placeholder}
              className="aspect-video h-40"
            />
            <div className="flex flex-col">
              <p>Pastikan Gambar dengan orientasi lanscape</p>
              <div className="flex flex-row items-center gap-2">
                <div className="linear mt-3 w-fit cursor-pointer rounded-xl bg-brand-500 px-4 py-2 text-white">
                  <label className="flex flex-row items-center gap-1">
                    <Image className="h-5 w-5" />
                    <div>
                      <span class="mt-2 text-base leading-normal">
                        Pilih Promo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        onChange={(e) => {
                          setUp(true)
                          SetPromo(e.target.files[0]);
                          SetPromoImg(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </div>
                  </label>
                </div>
                {up? <div onClick={()=>{
                  SetPromoImg(false)
                  addPromo()
                }} className="linear mt-3 w-fit cursor-pointer rounded-xl bg-brand-500 px-4 py-2 text-white">
                  <div className="flex flex-row items-center">
                  <MdUpload/>
                  <p>Upload Promo</p>
                  </div>
                </div>: null}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
        <div class="relative flex flex-col py-4">
          <div class="text-xl font-bold text-navy-700 dark:text-white">
            <p>Daftar Promo</p>
          </div>
          <div className="mt-2 flex w-full flex-row flex-wrap gap-3">
            {daftarPromo.map((list, index) => {
              return (
                  <div className="w-fit relative" key={index}>
                    <img
                      className="aspect-video h-40 rounded-lg"
                      src={`${url}/${list.promo}`}
                    />
                    <div onClick={()=>{
                      setmodal(!modal)
                      setI(index)
                      }} className="linear absolute top-2 right-2 w-fit cursor-pointer rounded-full bg-brand-500 p-2 text-white">
                      <IoMdTrash className="w-5 h-5"/>
                    </div>
                    {i==index? modal? 
                    <div className="flex mt-2 flex-col gap-2">
                      <p>Yakin Menghapus Promo ? </p>
                      <div className="flex gap-2 flex-row">
                      <div className="bg-red-500 w-fit cursor-pointer px-4 py-2 border-radius rounded-[10px] text-white" onClick={()=>{
                        setmodal(!modal) 
                        deletePromo(list.id)
                        }} >Hapus</div>
                      <div className="bg-brand-500 w-fit px-4 py-2 cursor-pointer border-radius rounded-[10px] text-white" onClick={()=>setmodal(!modal)} >Batal</div>
                      </div>
                    </div> :null :null}
                  </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Promo;
