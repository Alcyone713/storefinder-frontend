import React, { useState, useEffect } from "react";
import image from "./image.png";
import SearchResult from "./SearchResult";
import { fetchNearestStore } from "../Api/storeApi";
import { Link } from "react-router-dom";

export default function SidePanel({ list, onClickHandler, userPosition }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [nearestStores, setNearestStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        if (userPosition) {
          const stores = await fetchNearestStore(
            userPosition.lat,
            userPosition.lng
          );
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const filterStores = () => {
    if (searchCategory === "Nearest Stores") {
      return nearestStores;
    } else
      return list.filter((store) => {
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

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = '/';
  };

  return (
    <div className="sidepanel" style={styles.sidepanel}>
      <div className="navbar" style={styles.navbar}>
        <img src={image} height="50px" style={styles.logo} alt="logo" />
        <h2>Storefinder</h2>
        <svg
          style={styles.logout}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          onClick={handleLogout}
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
          />
        </svg>
      </div>
      <h3>Hi! {username}</h3>
      <Link to="/favourite" style={styles.favbutton}>
        View fav stores
      </Link>
      <div className="search" style={styles.search}>
        <select
          style={styles.dropdown}
          onChange={handleCategoryChange}
          value={searchCategory}
        >
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
          onChange={handleSearch}
        />
      </div>

      <div className="searchResults" style={styles.searchresults}>
        {filteredList.map((store, index) => (
          <SearchResult
            key={index}
            data={store}
            page={1}
            onClickHandler={onClickHandler}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  dropdown: {
    marginRight: "10px",
    padding: "7px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    fontSize: "16px",
  },
  logout: {
    marginLeft: "150px",
    width: '2em', 
    height: '2em',
  },
  searchInput: {
    flex: 1,
    padding: "7px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "17px",
  },
  sidepanel: {
    height: "100vh",
    width: "25vw",
    zIndex: "10",
    boxShadow: "1px 1px 7px 5px gray",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px",
  },
  logo: {
    height: "50px",
    width: "50px",
    borderRadius: "50px",
    marginRight: "30px",
    marginLeft: "20px",
  },
  search: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    padding: "10px",
  },
  searchresults: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    marginTop: "20px",
    padding: "10px",
  },
  favbutton: {
    padding: "10px 10px",
    width: "200px",
    alignSelf: "center",
    backgroundColor: "#1C515F",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
