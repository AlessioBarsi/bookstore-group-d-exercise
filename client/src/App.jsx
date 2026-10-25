import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Routes, Route } from "react-router";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import { FavoritesProvider } from './context/FavoriteContext';

function App() {
  return (

    <FavoritesProvider>

      <div className='font-body bg-bg min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </FavoritesProvider>
  );
}

export default App;
