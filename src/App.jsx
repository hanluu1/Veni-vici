import React, { useState, useEffect } from "react";

const App = () => {
  const [photo, setPhoto] = useState(null);
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch("https://api.unsplash.com/photos/random", {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Unsplash data:", data); 
      setPhoto(data);
    } catch (error) {
      console.error("Fetching photo failed:", error);
    }
  };

  useEffect(() => {
    fetchRandomPhoto();
  }, []);

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Random Unsplash Photo</h1>
      <button onClick={fetchRandomPhoto}>
        Discover Another Photo 🌎
      </button>

      <div className="sub-container">
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Unsplash Photo"}
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <p>
          Photographer: {photo.user.name}
        </p>
        <p>
          Description:{" "}
          {photo.alt_description || "No description provided."}
        </p>

        {photo.tags && photo.tags.length > 0 && (
          <div>
            <strong>Tags:</strong>
            <ul>
              {photo.tags.map((tagObj, index) => (
                <li key={index}>{tagObj.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
