import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Goods from './component/Goods'
import Fruits from './component/Fruits'
import FruitsCreate from './component/FruitsCreate'
import FruitsUpdate from './component/FruitsUpdate'
import BookStore from './component/BookStore'
import BookStoreCreate from './component/BookStoreCreate'
import BookStoreUpdate from './component/BookStoreUpdate'
import Noodle from './component/Noodle';
import NoodleCreate from './component/NoodleCreate';
import NoodleUpdate from './component/NoodleUpdate';
import Question from './component/Question';
import Login from './component/Login';
import Join from './component/Join';
import { AlertContext, AlertProvider } from './AlertContext';

function AppContent() {
  const { questionCount, goodsCount, fruitsCount, noodleCount, bookstoreCount, userCount } = React.useContext(AlertContext);
  const badgeStyle = {
    display: 'inline-block',
    marginLeft: 6,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: 22,
    height: 22,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 'bold'
  };

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend(React) + Backend(MySQL) setting, DB 데이터 입력/출력/수정/삭제</h1>

          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/goods'>
                Goods
                {goodsCount > 0 && (
                  <span style={badgeStyle}>{goodsCount}</span>
                )}
              </Link></li>
              <li><Link to='/fruits'>
                Fruits
                {fruitsCount > 0 && (
                  <span style={badgeStyle}>{fruitsCount}</span>
                )}
              </Link></li>
              <li><Link to='/noodle'>
                Noodle(개인 실습)
                {noodleCount > 0 && (
                  <span style={badgeStyle}>{noodleCount}</span>
                )}
              </Link></li>
              <li><Link to='/bookstore'>
                Bookstore
                {bookstoreCount > 0 && (
                  <span style={badgeStyle}>{bookstoreCount}</span>
                )}
              </Link></li>
              <li>
                <Link to="/question">
                  question
                  {questionCount > 0 && (
                    <span style={badgeStyle}>{questionCount}</span>
                  )}
                </Link>
              </li>
              <li><Link to='/login'>
                login
                {userCount > 0 && (
                  <span style={badgeStyle}>{userCount}</span>
                )}
              </Link></li>
              <li><Link to='/join'>join</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<h2>Home</h2>} />
            <Route path='/goods' element={<Goods />} />
            <Route path='/fruits' element={<Fruits />} />
            <Route path='/fruits/fruitscreate' element={<FruitsCreate />} />
            <Route path='/fruits/fruitsupdate/:num' element={<FruitsUpdate />} />
            <Route path='/bookstore' element={<BookStore />} />
            <Route path='/bookstore/bookstorecreate' element={<BookStoreCreate />} />
            <Route path='/bookstore/bookstoreupdate/:code' element={<BookStoreUpdate />} />
            <Route path='/noodle' element={<Noodle />}></Route>
            <Route path='/noodle/noodlecreate' element={<NoodleCreate />}></Route>
            <Route path='/noodle/noodleupdate/:num' element={<NoodleUpdate />}></Route>
            <Route path='/question' element={<Question />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/join' element={<Join />}></Route>
          </Routes>
        </main>

        <footer>
          <p>Copyright&copy;2025 React Frontend + Backend All rights reserved.</p>
        </footer>
      </BrowserRouter >
    </>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  )
}

export default App;
