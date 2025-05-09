import React, { useContext } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css'; // Optional: style file if you have custom styles

const AdminSettings = () => {
  const { enabledModules, setEnabledModules } = useContext(AppContext);

  const toggleModule = (moduleKey) => {
    setEnabledModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Module Customization</h2>

      <div className="space-y-4">
        {Object.keys(enabledModules).map((moduleKey) => (
          <div key={moduleKey} className="flex items-center justify-between">
            <span className="capitalize font-medium">{moduleKey} Module</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabledModules[moduleKey]}
                onChange={() => toggleModule(moduleKey)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative">
                <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 peer-checked:translate-x-full transition-all duration-300"></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
