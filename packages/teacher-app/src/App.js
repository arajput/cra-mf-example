import React from 'react';

import { extendTheme, NativeBaseProvider, Container } from "native-base";
import {DEFAULT_THEME} from '@shiksha/common-lib';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const RemoteButton = React.lazy(() => import('attendance/Button'));
const Attendance = React.lazy(() => import('attendance/Attendance'));


const App = () => {
  const theme = extendTheme(DEFAULT_THEME);
return(
    <NativeBaseProvider theme={theme}>
      <React.Suspense fallback="Loading ">
      <Router>
          <Routes>
            <Route path="my-attendace" element={<Attendance />} />
            <Route path="my-attendace/:classId" element={<Attendance />} />
            <Route path="*" element={<Attendance />} />
          </Routes>
        </Router>
      </React.Suspense>  
    </NativeBaseProvider>
  );
}

export default App;
