import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from '../src/pages/Login'
import Home from './pages/Home'
import Book from './pages/Book';
import BorrowBook from './pages/BorrowBook';
import Staff from './pages/Staff';
import LibraryCard from './pages/LibraryCard';
import ReadBook from './pages/ReadBook';
import Navbar from './components/Navbar';
export default function App() {
  return (

    <BrowserRouter>
      <Routes className="">
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/read-book/:id" element={<ReadBook />} />
        <Route path="/borrow-book" element={<BorrowBook />} />
        <Route path="/library-card" element={<LibraryCard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      {/*<FooterComponent />*/}

    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

