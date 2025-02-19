import React from 'react';

const ToggleSwitch = ({ offlineMode, setOfflineMode }) => {
  return (
    <div className="toggle-container">
      <label>
        Offline Mode
        <input
          type="checkbox"
          checked={offlineMode}
          onChange={() => setOfflineMode(!offlineMode)}
        />
      </label>
    </div>
  );
};

export default ToggleSwitch;
