import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import Search from "./Search";

const Navbar = () => {

  const {user} = useContext(userContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout")
    .then(res => {
      if(res.data === "Success") {
        navigate(0);
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="bg-gray-100 h-16 px-5 flex items-center justify-between">
      <h3><Link className="text-3xl text-indigo-500" to={"/"}>VinVin</Link></h3>

      <Search />

      {
        user.username ? 
        <div onClick={() => setProfile(!profile)}>
          {profile ?
          <div className="relative" style={{ zIndex: 999 }}>
            <div className="absolute top-8 text-black right-5 w-[150px] bg-white shadow-md shadow-gray-300">
              <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer"><Link to={`/profile/${user.id}`}>Profil</Link></div>
              <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer">
                <Link to={"/create"}>Create</Link>
              </div>
              {
                user.role === "admin" ? 
                <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </div>  : <></>
              }
              <div className="hover:bg-gray-100 px-5 py-2 cursor-pointer" onClick={handleLogout}>Cikis</div>
            </div>
          </div> : <></>
          }
          <div className="cursor-pointer">{user.email}</div>
        </div>  
        : <div><Link to="/login" className="text-3md">Giris Yap</Link></div>
      }
    </div>
  )
}

export default Navbar