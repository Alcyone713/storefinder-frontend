import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchStores } from "../Api/storeApi";
import SidePanel from "./SidePanel";
import Map from "./Map";
import { useGeolocated } from "react-geolocated";

const apikey = "RkXF6LLDJAR4VdPTjO7latfWKcEFWg-kkNemQ7IO5xc";

function HomePage() {
  const [userPosition, setUserPosition] = useState({ lat: 28.733255, lng: 77.109987 });
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
    React.useEffect(() => {
        if (!isGeolocationAvailable) {
          console.log('1');
          setUserPosition({ lat: 28.733255, lng: 77.109987 });
        } else if (!isGeolocationEnabled) {
          console.log('2');
          setUserPosition({ lat: 28.733255, lng: 77.109987 });
        } else if (coords) {
          console.log('3');
          setUserPosition({ lat: coords.latitude, lng: coords.longitude });
        }
      }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  const [restaurantPosition, setRestaurantPosition] = useState(null);

  useEffect(() => {
    const getStores = async () => {
      try {
        const storeData = await fetchStores();
        setStores(storeData);
        console.log(storeData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  const onClickHandler = (location) => {
    setRestaurantPosition({ lat: location.latitude, lng: location.longitude });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Home" style={styles.home}>
      <SidePanel list={stores} onClickHandler={onClickHandler} />
      <Map
        apikey={apikey}
        userPosition={userPosition}
        restaurantPosition={restaurantPosition}
      />
    </div>
  );
}

export default HomePage;

const styles = {
  home: {
    display: "flex",
    flexDirection: "row",
  },
};