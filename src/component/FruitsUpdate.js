import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FruitsUpdate = () => {
  // url 경로에서 num값을 추출하여 가져옴
  const { num } = useParams();

  const [form, setForm] = useState({
    num: '',
    name: '',
    price: '',
    color: '',
    country: '',
  })

  const navigate = useNavigate();

  // 서버측에 넘길 num값을 비동기로 통신하여 성공, 실패여부를 출력하고
  // 컴포넌트가 마운트 될 때 해당 num값에 데이터를 조회하여 출력함
  useEffect(() => {
    axios.get(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/fruits/${num}`)
      // 성공이면
      .then(res => {
        console.log('서버 응답 값 : ', res.data);
        setForm(res.data);
      })
      // 실패면
      .catch(err => console.log('조회 오류 : ', err))
  }, [num])

  // 입력폼에 입력시 데이터 입력을 위한 함수
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 수정하기 버튼 클릭시 내용 전송을 위한 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 비동기방식으로 업데이트할 내용을 백엔드로 전달함
    axios.put(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/fruits/fruitsupdate/${num}`, {
      name: form.name,
      price: form.price,
      color: form.color,
      country: form.country,
    })
      .then(() => { // 통신이 성공적으로 이루어질 경우
        alert('상품정보가 수정 완료되었습니다.');
        navigate('/fruits');
      })
      .catch((err) => { // 통신이 실패할 경우
        console.log('수정실패 : ', err)
      })
  }

  return (
    <>
      <h2>Fruits 수정(업데이트)을 위한 페이지</h2>

      <form name='과일정보입력' onSubmit={handleSubmit}>
        <p>
          <label htmlFor="num">번호</label>
          <input
            id='num'
            name='num'
            value={form.num}
            readOnly
          />
        </p>

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
          <input type="submit" value="수정하기" />
        </p>
      </form>
    </>
  );
};

export default FruitsUpdate;