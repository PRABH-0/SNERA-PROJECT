import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components import
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Match from './components/Match/Match';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Hero from './components/Hero/Hero'; 
import Teams from './components/Teams/Teams';
import Feedback from './components/Feedback/Feedback';
import CreatePost from './components/CreatePost/CreatePost';

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
    element: <Layout />,  
    children: [
      { path: "/Home", element: <Home /> },
      { path: "/Match", element: <Match /> },
      { path: "/Chat", element: <Chat /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/Projects", element: <Projects /> },
      { path: "/Teams", element: <Teams /> },
      { path: "/Feedback", element: <Feedback /> },
      { path: "/About", element: <About /> },
      { path: "/CreatePost", element: <CreatePost /> },

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
