import axios from 'axios';
// import React, { useState, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';
// import { AlertContext } from '../AlertContext';

const Question = () => {
  const navigate = useNavigate();

  // 1. 상태변수 만들기
  const [agree, setAgree] = useState(false); // input 체크박스
  // const { setQuestionCount } = useContext(AlertContext);
  const [formData, setFormData] = useState({ // input 입력
    name: '',
    phone: '',
    email: '',
    content: '',
  })

  // 2. 사용자가 입력양식에 입력을 하면 발생되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target; // 사용자가 입력하는 값

    setFormData(prev => ({ // 상태함수에
      ...prev,
      [name]: value // 각각 '키:값'으로 저장한다
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    // 3. 문의하기 버튼 동의여부 체크 = 유효성 검사
    if (!agree) { // 체크박스에 체크를 하지 않았다면
      alert('개인정보처리방침에 동의해 주세요.');
      return;
    }

    // 4. 전송하기(비동기로)
    axios.post('http://localhost:9070/api/question', formData)
      .then((res) => {
        alert('문의사항이 접수되었습니다.');
        // setQuestionCount(count => count + 1);
        setFormData({ // 입력창 값 비우기
          name: '',
          phone: '',
          email: '',
          content: ''
        })
        setAgree(false); // 체크박스 체크 풀기
        navigate('/question');
      })
      .catch(err => console.log(err))
  }

  // 변수선언 > 함수작성 ? 호출하여 내용 실행 > 결과전송

  return (
    <>
      <section className='question'>
        <h2>question</h2>
        <form onSubmit={handleSubmit}>
          <h3>정성을 다해 답변을 해드리갰습니다.</h3>
          <div className='form-area'>
            <div className='info-box'>
              <label htmlFor="name">성함</label>
              <input
                type="text"
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='성함을 입력해 주세요'
                required
              />

              <label htmlFor="phone">전화번호</label>
              <input
                type="number"
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='예) 01012345678'
                required
              />

              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='이메일을 입력해 주세요'
                required
              />
            </div>

            <div className='txt-box'>
              <label htmlFor="content">문의 내용</label>
              <textarea
                cols='30'
                rows='10'
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder='문의 내용을 입력해 주세요'
                required
              ></textarea>
            </div>
          </div>

          <div className='btn-area'>
            <div className="chcek-box">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree((e.target.checked))}
              />
              <label htmlFor="agree">개인정보처리방침에 동의합니다.</label>
            </div>

            <button
              type='submit'
              style={{
                marginTop: '20px',
                padding: '10px 40px',
                fontWidth: 'bold',
                background: '#ddd'
              }}
            >SEND</button>
          </div>
        </form>
      </section>

      <QuestionList />
    </>
  );
};

export default Question;