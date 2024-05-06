import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Cars from "./Cars";
import Entry from "./Entry";


const Home = () => {

  const [cars, setCars] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/car/getCars")
    .then(cars => {
      setCars(cars.data)
    })
    .catch(err => console.log(err));
  },[]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = cars.slice(firstPostIndex, lastPostIndex);


  return ( <>
    {/* <div>
      <Entry />
    </div> */}

    <div className="flex justify-center mt-5">
      <span className="text-2xl">Araclar</span>
    </div>

    <div className="flex flex-wrap justify-center container mx-auto cursor-pointe">
      <Cars cars = {currentPosts}/>
    </div>

    <div className="flex justify-center mt-5">
      <Pagination
        totalPosts = {cars.length}
        postsPerPage = {postsPerPage}
        setCurrentPage = {setCurrentPage}
      />
    </div>
  </>
  )
}

export default Home