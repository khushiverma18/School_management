import React, { useContext } from 'react';
import { AppContext } from '../context/contexts';
import ModuleAttendance from './Attendance';
import ModuleEvents from './Events';
import ModuleResults from './Results';
import ModuleReport from './ReportGenerator';

const ModuleDashboard = () => {
  const { enabledModules } = useContext(AppContext);

  return (
    <div className="dashboard">
      {enabledModules.attendance && <ModuleAttendance />}
      {enabledModules.events && <ModuleEvents />}
      {enabledModules.results && <ModuleResults />}
      {enabledModules.reports && <ModuleReport />}
    </div>
  );
};

export default ModuleDashboard;
