import axios from 'axios';
import React, { useState } from 'react';

const Join = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState(''); // 에러시 출력을 위한 변수
  const [success, setSuccess] = useState(''); // 성공시 출력을 위한 변수

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    setError(''); // 에러 초기화
    setSuccess(''); // 성공 초기화
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 맞는지 확인(유효성 검사)
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 맞지 않습니다. 다시 확인하세요.');
      return;
    }

    try {
      await axios.post('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/frontend-register', form)

      setSuccess('회원가입이 완료되었습니다.');

      setForm({
        username: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) {
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.')
    }
  }

  return (
    <>
      <section>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="password">비밀번호 : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='패스워드'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="confirmPassword">비밀번호 확인 : </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder='패스워드 확인'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <input type="submit" value="회원가입" />
          </p>

          {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* 회원가입 성공이면 초록색으로 문자 출력 */}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </section>
    </>
  );
};


export default Join;
