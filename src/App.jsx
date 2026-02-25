import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/Routes";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}>
            {route.children?.map((child, j) => (
              <Route
                key={j}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
      <ToastContainer />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
