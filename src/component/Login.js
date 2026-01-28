import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const { setUserCount } = useContext(AlertContext);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/login', form);

      // 사용자 인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);

      alert('로그인 성공');
    } catch (err) {
      // console.log(err.response.data.error);
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.')
    }
  }

  const loadData = async () => {
    try {
      const res = await axios.get('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/usercount');

      setUserCount(res.data.length);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
      <section className='login'>
        <h2>로그인</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 </label>
            <input
              type="text"
              id='username'
              name='username'
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="password">비밀번호 </label>
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>
            <input type="submit" value="로그인" />
          </p>

          <p className='links'>
            <Link to={'/id_search'} title='아이디 찾기 페이지로 이동'>아이디 찾기</Link>
            <Link to={'/pw_search'} title='비밀번호 찾기 페이지로 이동'>비밀번호 찾기</Link>
            <Link to={'/join'} title='회원가입 페이지로 이동'>회원가입</Link>
          </p>
        </form>

        <dl>
          <dt>* 로그인 구현 전체 구성</dt>
          <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청하기</dd>
          <dd>2. 백엔드(Node.js + Express) : 로그인 처리, JWT 토큰 발급</dd>
          <dd>3. 데이터베이스(MySQL) : DB 입/출력</dd>
          <dd>4. 보안 : 비밀번호 bcrypt암호화, JWT로 인증을 유지</dd>
        </dl>

        <div>
          <p>DB 설계(users)</p>
          <pre>
            1. 테이블 생성
            CREATE TABLE users (
            `id` INT PRIMARY KEY AUTO_INCREMENT,
            `username` VARCHAR(100) UNIQUE NOT NULL,
            `password` VARCHAR(255) NOT NULL,
            `datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
            );

            2. 데이터 입력
            INSERT INTO users VALUES(1, 'jeon', '1234', '2025-05-26');
            INSERT INTO users VALUES(2, 'jeon2', '1234', '2025-05-26');
            INSERT INTO users VALUES(3, 'jeon3', '1234', '2025-05-26');
            INSERT INTO users VALUES(4, 'jeon4', '1234', '2025-05-26');
            INSERT INTO users VALUES(5, 'jeon5', '1234', '2025-05-26');

            3. UI화면 설계 - 로그인 폼, 회원가입 폼 구현
          </pre>
        </div>

        <div>
          <p>npm i bcrypt - 암호화</p>
          <p>npm i jsonwebtoken - 인증처리</p>
        </div>
      </section>
    </>
  );
};

export default Login;