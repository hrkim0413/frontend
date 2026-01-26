import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);
  const [bookstoreCount, setBookstoreCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => { // 한번에 badge 데이터를 불러옴
    axios.get('http://localhost:9070/goods')
      .then(res => setGoodsCount(res.data.length))
    axios.get('http://localhost:9070/fruits')
      .then(res => setFruitsCount(res.data.length))
    axios.get('http://localhost:9070/bookstore')
      .then(res => setBookstoreCount(res.data.length))
    axios.get('http://localhost:9070/question')
      .then(res => setQuestionCount(res.data.length))
    axios.get('http://localhost:9070/usercount')
      .then(res => setUserCount(res.data.length))
  }, [])

  return (
    <AlertContext.Provider
      value={{
        questionCount,
        setQuestionCount,
        goodsCount,
        setGoodsCount,
        fruitsCount,
        setFruitsCount,
        noodleCount,
        setNoodleCount,
        bookstoreCount,
        setBookstoreCount,
        userCount,
        setUserCount
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
