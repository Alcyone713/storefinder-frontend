import React, { useState, useEffect } from "react";
import image from "./image.png";
import SearchResult from "./SearchResult";
import { fetchNearestStore } from "../Api/storeApi";


export default function SidePanel({ list, onClickHandler, userPosition }) {
  const [searchTerm, setSearchTerm]= useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [nearestStores, setNearestStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        if (userPosition) {
          const stores = await fetchNearestStore(userPosition.lat, userPosition.lng);
          setNearestStores(stores);
        }
      } catch (error) {
        console.error("Error fetching nearest stores", error);
      }
    };
    fetchStores();
  }, [userPosition]);

  if (!list || list.length === 0) {
    return <div>No stores available</div>;
  }

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  }
  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const filterStores = () => {
    if(searchCategory==="Nearest Stores"){
      return nearestStores;
    }
    else return list.filter((store) => {
      if (searchCategory === "name") {
        return store.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCategory === "category") {
        return store.categories.some((category) =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (searchCategory === "product") {
        return store.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });
  };
  const filteredList = filterStores();

  return (
    <div className="sidepanel" style={styles.sidepanel}>
      <div className="navbar" style={styles.navbar}>
        <img src={image} height="50px" style={styles.logo} alt="logo" />
        <h2>Storefinder</h2>
      </div>
      <div className="search" style={styles.search}>
        <select style={styles.dropdown} onChange={handleCategoryChange} value={searchCategory}>
        <option value="category">Nearest Stores</option>
          <option value="category">Category</option>
          <option value="product">Product</option>
          <option value="name">Name</option>
        </select>
        <input
          type="text"
          placeholder="Search for stores"
          style={styles.searchInput}
          value={searchTerm}
          onChange={(handleSearch)}
        />
      </div>
      <div className="searchResults" style={styles.searchresults}>
        {filteredList.map((store, index) => (
          <SearchResult
            key={index}
            data={store}
            onClickHandler={onClickHandler}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  dropdown: {
    marginRight: '10px',
    padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    fontSize: '16px'
  },
  searchInput: {
    flex: 1,
    padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '17px'
  },
  sidepanel: {
    height: '100vh',
    width: '25vw',
    zIndex: '10',
    boxShadow: '1px 1px 7px 5px gray',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px'
  },
  logo: {
    height: '50px',
    width: '50px',
    borderRadius: '50px',
    marginRight: '30px',
    marginLeft: '20px'
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  searchresults: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: 'scroll',
    marginTop: '20px',
    padding: '10px',
  }
};