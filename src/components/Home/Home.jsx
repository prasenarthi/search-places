import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placesList, setPlacesList] = useState([]);
  const userInputRef = useRef(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        userInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaces();
    };

    fetchData();
  }, [currentPage]);

  const fetchPlaces = async () => {
    if (!userInput.trim()) {
      setPlacesList([]);
      return;
    }

    const offset = (currentPage - 1) * itemsPerPage;
    console.log(offset, "offset");

    setLoading(true);
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${userInput}&limit=${itemsPerPage}&offset=${offset}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "ecedcadd92msh0e126d54156f88bp1b2840jsn4c9c507532af",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setPlacesList(data.data);
        setTotalItems(data.metadata.totalCount);
      } else {
        setPlacesList([]);
        setTotalItems(0);
      }
    } catch (e) {
      console.log(e);
      setPlacesList([]);
      setTotalItems(0);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchPlaces();
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setItemsPerPage(value);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="main-container">
      <h1 className="main-title">Search Places</h1>
      <div className="search-input-container">
        <input
          ref={userInputRef}
          type="search"
          placeholder="Search places..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleSearch}
          className="search-input"
        />
        <p className="search-btn">Ctrl+/</p>
      </div>
      <div className="table-container">
        <Table
          placesList={placesList}
          loading={loading}
          userInput={userInput}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          setCurrentPage={setCurrentPage}
        />
        <input
          type="number"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          min="1"
          max="10"
        />
      </div>
    </div>
  );
};

export default Home;
