import React from 'react';

const ToggleSwitch = ({ offlineMode, setOfflineMode }) => {
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input
          type="checkbox"
          checked={offlineMode}
          onChange={() => setOfflineMode(!offlineMode)}
        />
        <span className="slider"></span>
      </label>
      <span className="label-text">Offline Mode</span>
    </div>
  );
};

export default ToggleSwitch;
