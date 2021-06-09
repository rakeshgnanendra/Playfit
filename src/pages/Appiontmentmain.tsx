import React from 'react';
import AppointmentApp from '../pages/AppointmentApp';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const Appointmentmain: React.FC = () => {
    return (
        <div>
        <MuiThemeProvider>
          <AppointmentApp />
        </MuiThemeProvider>
      </div>
    )
}

export default Appointmentmain;