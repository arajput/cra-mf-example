
import { extendTheme, NativeBaseProvider } from "native-base";
import {DEFAULT_THEME} from '@shiksha/common-lib';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MyClasses from "./pages/myclasses/MyClasses";
import ClassDetails from "./pages/myclasses/ClassDetails";

const App = () => {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    

    <div>
      <h1>Core Module</h1>
      <NativeBaseProvider theme={theme}>
        
          <Router>
            <Routes>
              <Route path="my-classes" element={<MyClasses />} />
              <Route path="my-classes/:classId" element={<ClassDetails />} />

              <Route path="*" element={<MyClasses />} />
            </Routes>
          </Router>
        
      </NativeBaseProvider>
    </div>
  );
}

export default App;
