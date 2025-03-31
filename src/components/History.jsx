import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history-container">
      <h3>Photo History 📸 </h3>

      <div className="history-list">
        {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        history.map((item, index) => (
          <div className="history-item" key={index}>
            <img src={item.imageUrl} alt={item.description} />
            <div className="history-details">
              <p><strong>Photographer:</strong> {item.photographer}</p>
              <p><strong>City:</strong> {item.city}</p>
              <p><strong>Country:</strong> {item.country}</p>
              <p><strong>Likes:</strong> {item.likes}</p>
            </div>
          </div>
        ))
      )}
      </div>
      
    </div>
  );
};

export default History;
