import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { RequireAuth,useSignOut } from "react-auth-kit";
import Error404 from "layouts/error/404";
import Profile from 'views/profile';
import Editprofile from 'views/editProfile'
import TambahAgen from 'views/admin/tambahAgen'
import TambahUstad from 'views/admin/tambahUstad'
import EditAgen from 'views/admin/editAgen'
import EditUstad from 'views/admin/editUstad';
import AgenProfile from 'views/profileAgen'
import UstadProfile from 'views/profileUstad'
import JamaahProfile from 'views/profileJamaah'
import AgenLayout from 'layouts/agen'
import AgenProfiles from 'views/agen/profile'
import AgenProfilesEdit from 'views/agen/editProfile'
import AgenJamaahProfile from 'views/agen/profileJamaah'
import AgenProfilePic from 'views/agen/editProfilePic'
import JamaahPerkab from 'views/agen/perkabJamaah'
import DocJamaah from 'views/agen/dokumenJamaah'
import AgenProfileAgen from 'views/agen/profileAgen'
import AgenJamaahProfiles from 'views/agen/profileJamaahAgen'
import TambahJamaah from 'views/agen/tambahJamaah'
import UstadLayout from 'layouts/ustad'
import UstadProfiles from 'views/ustad/profile'
import UstadProfilesEdit from 'views/ustad/editProfile'
import UstadProfilesEditPic from 'views/ustad/editProfilePic'
import UstadProfilesJamaahku from 'views/ustad/profileJamaah'
import UstadJamahPerkab from 'views/ustad/perkabJamaah'
import UstadJamahDoc from 'views/ustad/dokumenJamaah'
import UstadTambahJamaah from 'views/ustad/tambahJamaah'
import UstadProfileUstad from 'views/ustad/profileUstad'
import UstadProfilejamaahUstad from 'views/ustad/profileJamaahUstad'
import { reactLocalStorage } from "reactjs-localstorage";
// import Cookies from "js-cookie";
import EditJamaahAgen from 'views/agen/editJamaah'
import EditJamaahUstad from 'views/ustad/editJamaah'
//manager
import ManagerLayout from 'layouts/manager'
import ManagerAgenProfile from 'views/profileAgen'
import ManagerAgenEdit from 'views/manager/editAgen'
import ManagerTambahAgen from 'views/manager/tambahAgen'
import ManagerTambahUstad from 'views/manager/tambahUstad'
import ManagerUstadEdit from 'views/manager/editUstad'
import ManagerUstadProfile from 'views/profileUstad'
import ManagerJamaahProfie from 'views/profileJamaahManager'

const App = () => {

  const logot = useSignOut()

  useEffect(() => {
    // const handleBeforeUnload = () => {
    //   // Hapus cookie di sini
    //   logot()
    // };

    // Tambahkan event listener saat komponen dimuat
    // window.addEventListener('beforeunload', handleBeforeUnload);

    // Bersihkan event listener saat komponen dibongkar
    return () => {
      logot()
    };
  }, []);

  if (reactLocalStorage.get('theme')) {
    document.body.classList.add("dark");
    reactLocalStorage.set('theme',true)
  } else {
    document.body.classList.remove("dark");
    reactLocalStorage.remove('theme')
  }

  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="profiles/*" element={<RequireAuth loginPath="/auth/login"><Error404/></RequireAuth>}/>
      <Route path="profiles" element={<RequireAuth loginPath="/auth/login"><Profile/></RequireAuth>}/>
      <Route path="profiles/edit" element={<RequireAuth loginPath="/auth/login"><Editprofile/></RequireAuth>}/>
      <Route path="manager/*" element={<RequireAuth loginPath="/auth/login"><ManagerLayout/></RequireAuth>} />
      <Route path="manager/agen/profile" element={<RequireAuth loginPath="/auth/login"><ManagerAgenProfile/></RequireAuth>} />
      <Route path="manager/agen/edit" element={<RequireAuth loginPath="/auth/login"><ManagerAgenEdit/></RequireAuth>} />
      <Route path="manager/plusagen" element={<RequireAuth loginPath="/auth/login"><ManagerTambahAgen/></RequireAuth>} />
      <Route path="manager/plusustad" element={<RequireAuth loginPath="/auth/login"><ManagerTambahUstad/></RequireAuth>} />
      <Route path="manager/ustad/edit" element={<RequireAuth loginPath="/auth/login" ><ManagerUstadEdit/></RequireAuth>}/>
      <Route path="manager/ustad/profile" element={<RequireAuth loginPath="/auth/login"><ManagerUstadProfile/></RequireAuth>} />
      <Route path="manager/jamaah/profile" element={<RequireAuth loginPath="/auth/login"><ManagerJamaahProfie/></RequireAuth>} />
      <Route path="admin/*" element={<RequireAuth loginPath="/auth/login"><AdminLayout/></RequireAuth>} />
      <Route path="admin/plusagen" element={<RequireAuth loginPath="/auth/login" ><TambahAgen/></RequireAuth>}/>
      <Route path="admin/plusustad" element={<RequireAuth loginPath="/auth/login" ><TambahUstad/></RequireAuth>}/>
      <Route path="admin/agen/edit" element={<RequireAuth loginPath="/auth/login" ><EditAgen/></RequireAuth>}/>
      <Route path="admin/ustad/edit" element={<RequireAuth loginPath="/auth/login" ><EditUstad/></RequireAuth>}/>
      <Route path="admin/agen/profile" element={<RequireAuth loginPath="/auth/login" ><AgenProfile/></RequireAuth>} />
      <Route path="admin/ustad/profile" element={<RequireAuth loginPath="/auth/login" ><UstadProfile/></RequireAuth>} />
      <Route path="admin/jamaah/profile" element={<RequireAuth loginPath="/auth/login" ><JamaahProfile/></RequireAuth>} />
      <Route path="agen/*" element={<RequireAuth loginPath="/auth/login"><AgenLayout/></RequireAuth>} />
      <Route path="agen/profiles" element={<RequireAuth loginPath="/auth/login"><AgenProfiles/></RequireAuth>}/>
      <Route path="agen/profiles/edit" element={<RequireAuth loginPath="/auth/login"><AgenProfilesEdit/></RequireAuth>}/>
      <Route path="agen/jamaah/profile" element={<RequireAuth loginPath="/auth/login" ><AgenJamaahProfile/></RequireAuth>}/>
      <Route path="agen/jamaah/edit" element={<RequireAuth loginPath="/auth/login" ><EditJamaahAgen/></RequireAuth>}/>
      <Route path="agen/jamaah/profile/perkab" element={<RequireAuth loginPath="/auth/login" ><JamaahPerkab/></RequireAuth>}/>
      <Route path="agen/jamaah/profile/doc" element={<RequireAuth loginPath="/auth/login" ><DocJamaah/></RequireAuth>}/>
      <Route path="agen/profiles/pic" element={<RequireAuth loginPath="/auth/login"><AgenProfilePic/></RequireAuth>}/>
      <Route path="agen/agens/profile" element={<RequireAuth loginPath="/auth/login"><AgenProfileAgen/></RequireAuth>} />
      <Route path="agen/agens/profile/jamaah" element={<RequireAuth><AgenJamaahProfiles/></RequireAuth>} />
      <Route path="agen/jamaah/tambah" element={<RequireAuth loginPath="/auth/login" ><TambahJamaah/></RequireAuth>} />
      <Route path="ustad/*" element={<RequireAuth loginPath="/auth/login"><UstadLayout/></RequireAuth>} />
      <Route path="ustad/profiles" element={<RequireAuth loginPath="/auth/login" ><UstadProfiles/></RequireAuth>} />
      <Route path="ustad/profiles/edit" element={<RequireAuth loginPath="/auth/login" ><UstadProfilesEdit/></RequireAuth>} />
      <Route path="ustad/profiles/pic" element={<RequireAuth loginPath="/auth/login" ><UstadProfilesEditPic/></RequireAuth>} />
      <Route path="ustad/profiles/jamaah" element={<RequireAuth loginPath="/auth/login" ><UstadProfilesJamaahku/></RequireAuth>} />
      <Route path="ustad/jamaah/edit" element={<RequireAuth loginPath="/auth/login" ><EditJamaahUstad/></RequireAuth>}/>
      <Route path="ustad/jamaah/tambah" element={<RequireAuth loginPath="/auth/login" ><UstadTambahJamaah/></RequireAuth>} />
      <Route path="ustad/profiles/jamaah/perkab" element={<RequireAuth loginPath="/auth/login" ><UstadJamahPerkab/></RequireAuth>} />
      <Route path="ustad/profiles/jamaah/doc" element={<RequireAuth loginPath="/auth/login" ><UstadJamahDoc/></RequireAuth>} />
      <Route path="ustad/ustads/profile" element={<RequireAuth loginPath="/auth/login" ><UstadProfileUstad/></RequireAuth>} />
      <Route path="ustad/ustads/profile/jamaah" element={<RequireAuth loginPath="/auth/login" ><UstadProfilejamaahUstad/></RequireAuth>} />
      <Route path="*" element={<Error404/>} />
      <Route path="/" element={ <Navigate to="/auth/login"/>}/>
    </Routes>
  );
};

export default App;
