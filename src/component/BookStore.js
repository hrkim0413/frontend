import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function BookStore(props) {
  //1. 상태변수 만들기
  const [data, setData] = useState([]);
  const { setBookstoreCount } = useContext(AlertContext);
  const navigate = useNavigate();

  //2. 데이터 리스트 비동기로 받아서 출력
  const loadData = () => {
    axios //비동기로
      .get('http://localhost:9070/bookstore') //주소로 요청한 json데이터 파일을 가져온다.
      .then(res => { //성공시 내용
        setData(res.data) //데이터 저장
        setBookstoreCount(res.data.length);
      })
      .catch( //실패시
        err => console.log(err)
      )
  }

  //3. useEffect - 콤포넌트 생명주기에서 데이터를 한번만 불러와야...함.
  useEffect(() => {
    loadData(); //비동기방식으로 함수실행
  }, [])

  //4. 삭제를 위한 함수
  const deleteData = (code) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:9070/bookstore/${code}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); //삭제후 다시 목록을 갱신한다.
        });
    }
  };

  // 5. 검색창
  const [inputKeyword, setInputKeyword] = useState(''); // 검색어 입력용
  const [keyword, setKeyword] = useState(''); // 실제 검색 키워드

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  )

  const handleSearch = () => {
    setKeyword(inputKeyword);
  }

  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
  }

  return (
    <>
      <h2>교보문고 DB입력/출력/삭제/수정</h2>
      <p>
        MYSQL DB에 있는 자료를 출력(SELECT)하고, 자료입력(INSERT), 삭제(DELETE), 수정(UPDATE)하기를 실습 응용한다. - CRUD
      </p>

      <div className="write-box">
        <button className="btn-write" onClick={() => navigate('./bookstorecreate')}>글쓰기</button>
      </div>

      <table className='data-list data-list-book'>
        <caption>교보문고 DB입력/출력/삭제/수정</caption>
        <thead>
          <tr>
            <th>코드</th>
            <th>서점명</th>
            <th>지역1</th>
            <th>지역2</th>
            <th>지역3</th>
            <th>주문개수</th>
            <th>주문자</th>
            <th>주문자 연락처</th>
            <th>편집</th>
          </tr>
        </thead>
        <tbody>
          {/* backend에서 db요청하여 결과를 json으로 받아서 map함수로 출력한다. */}
          {
            filterData.length > 0 ?
              // data.map(item => (
              filterData.map(item => ( // 수정 - 검색창 추가
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.area1}</td>
                  <td>{item.area2}</td>
                  <td>{item.area3}</td>
                  <td>{Number(item.book_cnt).toLocaleString()}</td>
                  <td>{item.owner_nm}</td>
                  <td>{item.tel_num}</td>
                  <td>
                    <button className="btn-change" onClick={() => navigate(`/bookstore/bookstoreupdate/${item.code}`)}>수정</button>
                    &nbsp;
                    <button className="btn-delete" onClick={() => deleteData(item.code)}>삭제</button>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan='9'>검색 결과가 없습니다</td>
              </tr>
          }
        </tbody>
      </table>

      <div className="search-box">
        <input
          placeholder="서점명 검색"
          type="text"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>검색</button>
        <button className="reset-btn" onClick={handleReset}>초기화</button>
      </div>
    </>
  );
}

export default BookStore;