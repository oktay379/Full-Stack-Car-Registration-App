import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { car } = useContext(userContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleFilter = (value) => {
    const filteredData = car.filter((c) => c.plate.includes(value));
    setData(filteredData);
  };

  const handleSearch = () => {
    if (data.length > 0) {
        const id = data[0]._id;
        navigate(`/car/${id}`);
        setSearchValue(""); 
        setData([]); 
    } else {
        navigate('/NotFound');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        handleSearch();
        setSearchValue(""); 
        setData([]); 
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <div className="flex bg-gray-100 rounded-full px-3">
          <IoSearch className="mr-3" size={20} />
          <input
            type="text"
            placeholder="Plaka Ara..."
            className="bg-transparent outline-none flex-grow"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleFilter(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-blue-500 text-white px-3 rounded-full ml-3"
            onClick={handleSearch}
          >
            Ara
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
