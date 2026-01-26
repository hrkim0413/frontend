import axios from 'axios';
// import React, { useState, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AlertContext } from '../AlertContext';

const FruitsCreate = () => {
  // 폼양식에 입력한 상태값 관리를 위함
  const [form, setForm] = useState({
    name: '', // 과일명
    price: '', // 가격
    color: '', // 색상
    country: '' // 원산지
  });
  // const { setFruitsCount } = useContext(AlertContext);

  // url 주소 관리
  const navigate = useNavigate();

  // 폼양식에 데이터를 입력하면 호출되는 함수
  const handleChange = (e) => {
    setForm({
      ...form, // 기존 배열값에 추가하여 입력
      [e.target.name]: e.target.value // 키:값
    })
  }

  // 폼양식 아래 'submit'버튼 클릭시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    // 비동기로 backend server에 데이터를 넘김
    axios
      .post('http://localhost:9070/fruits', form)
      .then(() => { // 통신이 성공적으로 이루어지면
        alert('상품이 정상적으로 등록 완료되었습니다.');
        // setFruitsCount(count => count + 1);
        navigate('/fruits'); // 상품목록 페이지로 이동하기
      })
      .catch(err => console.log(err)) // 실패시 콘솔에 에러 출력함
  }

  return (
    <>
      <h2>Fruits DB 입력을 위한 페이지</h2>

      <form name='과일정보입력' onSubmit={handleSubmit}>
        <p>
          <label htmlFor='name'>과일명</label>
          <input
            id='name'
            name='name'
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor='price'>가격</label>
          <input
            type='number'
            id='price'
            name='price'
            value={form.price}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor='color'>색상</label>
          <input
            id='color'
            name='color'
            value={form.color}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <label htmlFor='country'>원산지</label>
          <input
            id='country'
            name='country'
            value={form.country}
            onChange={handleChange}
            required
          />
        </p>

        <p>
          <input type="submit" value="신규상품 등록하기" />
        </p>
      </form>
    </>
  );
};

export default FruitsCreate;