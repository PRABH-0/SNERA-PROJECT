import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components import
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Match from './components/Match/Match';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import More from './components/More/More';
import Hero from './components/Hero/Hero';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Hero /> },
  {
    element: <Layout />,  // Navbar common for all
    children: [
      { path: "/Home", element: <Home /> },
      { path: "/More", element: <More /> },
      { path: "/Match", element: <Match /> },
      { path: "/Chat", element: <Chat /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/About", element: <About /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
