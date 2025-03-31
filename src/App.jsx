import React, { useState, useEffect } from "react";
import BanList from "./components/BanList";
import History from "./components/History"; 
const App = () => {
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [photo, setPhoto] = useState(null);
  const [banList, setBanList] = useState({
    photographer: [],
    likes: [],
    city: [],
    country: [],
  });
  const [history, setHistory] = useState([]);
  const fetchRandomPhoto = async () => {
    try{
      let validPhotoFound = false;
      let data;

      while (!validPhotoFound) {
        const response = await fetch("https://api.unsplash.com/photos/random", {
          headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        data = await response.json();
        const photographer = data.user.name;
        const likes = data.likes;
        const city = data.location?.city || "Unknown City";
        const country = data.location?.country || "Unknown Country";

        if (
          !banList.photographer.includes(photographer) &&
          !banList.likes.includes(likes) &&
          !banList.city.includes(city) &&
          !banList.country.includes(country)
        ) {
          validPhotoFound = true;
        }
      }
      setHistory(prev => photo ? [photo, ...prev] : prev);
      setPhoto({
        imageUrl: data.urls.small,
        photographer: data.user.name,
        description: data.alt_description || "No description provided.",
        likes: data.likes,
        city: data.location?.city || "Unknown City",
        country: data.location?.country || "Unknown Country",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRandomPhoto();
  }, [banList]);

  const toggleBanItem = (attribute, value) => {
    setBanList((prev) => ({
      ...prev,
      [attribute]: prev[attribute].includes(value)
        ? prev[attribute].filter((item) => item !== value)
        : [...prev[attribute], value],
    }));
  };


  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="sub-app-container">
        <div className="container">
          <h1>Guess where these pictures were taken</h1>          

          <div className="sub-container">
            <button onClick={fetchRandomPhoto}>Discover around the 🌎</button>

            <img src={photo.imageUrl} alt={photo.description} />
              <p> Description: {photo.description}</p>        

            <div className="attributes">
              <button onClick={() => toggleBanItem("photographer", photo.photographer)}>
                Photographer: {photo.photographer}
              </button>
              <button onClick={() => toggleBanItem("likes", photo.likes)}>
                Likes: {photo.likes}
              </button>
              <button onClick={() => toggleBanItem("city", photo.city)}>
                City: {photo.city}
              </button>
              <button onClick={() => toggleBanItem("country", photo.country)}>
                Country: {photo.country}
              </button>
            </div>
          </div>
        </div>
      <History history={history}/>
      </div>
      <BanList
        bannedItems={banList}
        removeFromBanList={toggleBanItem}/>
     
    </div>
  );
};

export default App;
