import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const Car = () => {

  const {user} = useContext(userContext);
  // console.log(user);

  const {id} = useParams();
  const [car, setCar] = useState({});
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/car/getCar/" + id)
    .then(res => {
      setCar(res.data);
      // console.log(res.data)
    })
    .catch(res => console.log(res))
  }, []);


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/car/deleteCar/${id}`)
    .then(res => {
      navigate("/");
    })
    .catch(res => console.log(res))
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex">
        <img src={`http://localhost:3000/Images/${car.file}`} className="w-1/2 h-auto rounded-lg mr-4" alt="Car" />
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">{car.title}</h2> <br />
          <span className="text-indigo-500">Plaka:</span> 
          <span className='ml-2'>{car.plate}</span>  <br /> 
          <span className="text-indigo-500">Arac Aciklamasi:</span> 
          <span className='ml-2'>{car.desc}</span>  <br /> 
          <span className="text-indigo-500">Kayit Eden Kullanici:</span>
          <span className='ml-2'>{car.email}</span>
          <div className="mt-5">
            {
              user.email ? 
              <button className='border border-gray-300 bg-gray-50 rounded-sm p-1'>
                <Link to={`/chat`} className="text-indigo-800">Mesaj Gonder</Link>
              </button> : <div>Kullanici Mesaj Atmak Icin Giris Yapiniz</div>
            }
          </div>
          {user.role === "admin" || user.email === car.email ? (
            <div className="mt-5">
              <Link to={`/editCar/${car._id}`} className="text-green-600 mr-4">Edit</Link>
              <button onClick={e => handleDelete(car._id)} className="text-red-500">Araci Sil</button>
            </div>
          ) : <></>}
        </div>
      </div>
    </div>

  )
}

export default Car