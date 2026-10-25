import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Routes, Route } from "react-router";
import Login from './pages/Login';

function App() {
  return (
    <div className='bg-bg min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
