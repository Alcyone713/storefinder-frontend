import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import SidePanel from "./SidePanel";
import Map from "./Map";
import { fetchStores } from "../Api/storeApi";

const apikey = "RkXF6LLDJAR4VdPTjO7latfWKcEFWg-kkNemQ7IO5xc";

function HomePage() {
  const [userPosition, setUserPosition] = useState({ lat: 28.733255, lng: 77.109987 });
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [error, setError] = useState(null);
  const [restaurantPosition, setRestaurantPosition] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (!isGeolocationAvailable) {
      console.log('Geolocation is not available');
      setUserPosition({ lat: 28.733255, lng: 77.109987 });
    } else if (!isGeolocationEnabled) {
      console.log('Geolocation is not enabled');
      setUserPosition({ lat: 28.733255, lng: 77.109987 });
    } else if (coords) {
      console.log('Geolocation coordinates received');
      setUserPosition({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

  useEffect(() => {
    const getStores = async () => {
      setLoading(true);
      try {
        const storeData = await fetchStores();
        if (storeData) {
          setStores(storeData);
          console.log('Store data fetched:', storeData);
        } else {
          console.log('No store data returned');
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching stores:', err);
      } finally {
        setLoading(false);
      }
    };

    getStores();
  }, []);

  const onClickHandler = (location) => {
    setRestaurantPosition(location);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!stores || stores.length === 0) return <div>No stores available</div>;

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
