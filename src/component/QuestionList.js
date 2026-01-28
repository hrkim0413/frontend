import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../AlertContext';

const QuestionList = () => {
  // 1. 가져올 데이터 변수 선언
  const [data, setData] = useState([]);
  const { setQuestionCount } = useContext(AlertContext);

  // 2. 문의하기 등록된 글 가져오기
  const loadData = () => {
    axios.get('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/question') // 백엔드 서버에 주소 요청
      .then(res => { // 성공시 데이터 저장
        setData(res.data);
        setQuestionCount(res.data.length);
      })
      .catch(err => console.log(err)) // 실패시 에러 출력
  }

  // 3. 컴포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, [])

  // 4. 날짜데이터 포맷
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR'); // 한국 지역 날짜
  }

  return (
    <>
      <section>
        <h2>관리자가 보는 페이지 목록</h2>
        <table className='data-list data-list-question'>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>문의내용</th>
              <th>접수일</th>
              <th>
                답변<br />
                (답변 완료시 완료라고 표시)
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.content}</td>
                  <td>{formatDate(item.date)}</td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </>
  );
};

export default QuestionList;