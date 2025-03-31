import React from "react";

const BanList = ({ bannedItems, removeFromBanList }) => {
  const attributes = Object.keys(bannedItems);

  return (
    <div className="banlist-container">
      <h3>Ban List 🚫 </h3>

      {attributes.map(
        (attr) =>
          bannedItems[attr].length > 0 && (
            <div key={attr}>
              <strong>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</strong>
              <ul>
                {bannedItems[attr].map((item, idx) => (
                  <li key={idx} onClick={() => removeFromBanList(attr, item)}>
                    {item} ✖️
                  </li>
                ))}
              </ul>
            </div>
          )
      )}

      {attributes.every((attr) => bannedItems[attr].length === 0) && (
        <p>No banned attributes yet.</p>
      )}
    </div>
  );
};

export default BanList;
