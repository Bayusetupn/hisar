import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import DaftarAgen from "views/admin/daftarAgen";
import DaftarUstad from 'views/admin/daftarUstad';
import Profile from 'views/profile';
import EditProfile from 'views/editProfile';
import TambahAgen from 'views/admin/tambahAgen';
import AgenDash from 'views/agen/dashboard';
import AgenDaftar from 'views/agen/daftarAgen';
import { IoPeople } from "react-icons/io5";
import Jamaahku from 'views/agen/daftarJamaah'
import UstadDash from 'views/ustad/dashboard'
import JamaahUstad from 'views/ustad/daftarJamaah'
import DaftarUstads from "views/ustad/daftarUstad";
import DaftarJamaah from 'views/admin/daftarJamaah';
import RankAdmin from 'views/admin/rank'
import RankAgen from 'views/agen/rank'
import RankUstad from 'views/ustad/rank'

//manager
import ManagerDash from 'views/manager/default'
import AgenManager from 'views/manager/daftarAgen'
import UstadManager from 'views/manager/daftarUstad'
import JamaahManager from 'views/manager/daftarJamaah'
import RankManager from 'views/manager/rank'

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdLeaderboard,
  MdPeople,
  MdPeopleAlt,
} from "react-icons/md";
import { IoMdPeople } from "react-icons/io";

const profile = [
  {
    name: "Profiles",
    path: "/profiles",
    component: <Profile/>
  },{
    name: "Edit Profiles",
    path: "profiles/edit",
    component: <EditProfile/>
  }

]

const tambah = [
  {
    name: "Tambah Agen",
    layout: "/admin",
    path: "plusagen",
    icon: <IoPeople className="h-6 w-6" />,
    component: <TambahAgen/>
  },
]

const login = [
  {
    name: "Login Page",
    layout: "/auth",
    path: "login",
    component: <SignIn/>
  }
]

const agen = [
  {
    name: "Dashboard",
    layout: "/agen",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <AgenDash />,
  },
  {
    name: "Daftar Agen",
    layout: "/agen",
    path: "agens",
    icon: <MdPeopleAlt className="h-6 w-6"/>,
    component: <AgenDaftar/>
  },
  {
    name: "Jamaah Anda",
    layout: "/agen",
    path: "jamaah",
    icon: <MdPeople className="h-6 w-6" />,
    component: <Jamaahku />
    
  },
  {
    name: "Ranking",
    layout: "/agen",
    path: "ranking",
    icon: <MdLeaderboard className="h-6 w-6"/>,
    component: <RankAgen/>
  }
]

const ustad = [
  {
    name: "Dashboard",
    layout: "/ustad",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <UstadDash/>
  },
  {
    name: "Daftar Ustad",
    layout: "/ustad",
    path: "ustads",
    icon: <MdPeopleAlt className="h-6 w-6"/>,
    component: <DaftarUstads/>
  },
  {
    name: "Daftar Jamaah",
    layout: "/ustad",
    path: "jamaah",
    icon: <MdPeople className="h-6 w-6" />,
    component: <JamaahUstad/>
  },
  {
    name: "Ranking",
    layout: "/ustad",
    path: "ranking",
    icon: <MdLeaderboard className="h-6 w-6"/>,
    component: <RankUstad/>
  }
]

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Daftar Agen",
    layout: "/admin",
    path: "agen",
    icon: <IoPeople className="h-6 w-6" />,
    component: <DaftarAgen/>
  },
  {
    name: "Daftar Ustad",
    layout: "/admin",
    path: "ustad",
    icon: <IoPeople className="h-6 w-6" />,
    component: <DaftarUstad/>
  },
  {
    name: "Daftar Jamaah",
    layout: "/admin",
    path: "jamaah",
    icon: <IoMdPeople className="h-6 w-6"/>,
    component: <DaftarJamaah/>
  },{
    name: "Ranking",
    layout: "/admin",
    path: "ranking",
    icon: <MdLeaderboard className="h-6 w-6"/>,
    component: <RankAdmin/>
  }]

const routes2 = [
    {
      name: "Dashboard",
      layout: "/manager",
      path: "dashboard",
      icon: <MdHome className="h-6 w-6" />,
      component: <ManagerDash />,
    },
    {
      name: "Daftar Agen",
      layout: "/manager",
      path: "agen",
      icon: <IoPeople className="h-6 w-6" />,
      component: <AgenManager/>
    },
    {
      name: "Daftar Ustad",
      layout: "/manager",
      path: "ustad",
      icon: <IoPeople className="h-6 w-6" />,
      component: <UstadManager/>
    },
    {
      name: "Daftar Jamaah",
      layout: "/manager",
      path: "jamaah",
      icon: <IoMdPeople className="h-6 w-6"/>,
      component: <JamaahManager/>
    },{
      name: "Ranking",
      layout: "/manager",
      path: "ranking",
      icon: <MdLeaderboard className="h-6 w-6"/>,
      component: <RankManager/>
    }

  /*{
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },*/
  /*
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },*/
];
export {
  routes,
  login,
  profile,
  tambah,
  agen,
  ustad,
  routes2
}
