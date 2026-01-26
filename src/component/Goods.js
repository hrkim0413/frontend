import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

const Goods = () => {
  const [data, setData] = useState([]); // json 데이터를 받기 위해
  const { setGoodsCount } = useContext(AlertContext);

  // 3. 페이지 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); // 초기값 1
  const itemPerPage = 5; // 한페이지당 보여지는 게시물 수

  // 1. 상품 리스트 조회(출력)
  const loadData = () => {
    // 비동기 통신 사용
    axios
      .get('http://localhost:9070/goods')
      // 성공시 데이터를 저장
      .then(res => {
        setData(res.data);
        setGoodsCount(res.data.length);
      })
      // 실패시 에러 출력
      .catch(err => console.log(err))
  }

  // 2. 컴포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, [])

  // 5. 검색창
  const [keyword, setKeyword] = useState('');

  // 검색어가 포함된 데이터만 필터링
  const filteredData = data.filter(item =>
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  );

  // 4. 페이지네이션 계산 - 현재 게시물 수(50) / 한페이지당 보여지는 게시물 수(5) = 10
  // 현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째 아이템까지 보여줍니다
  const indexOfFirst = indexOfLast - itemPerPage;

  // 예) data.slice(5, 10) -> data[5], data[6], data[7], data[8], data[9]만 화면에 표시
  // const currentItems = data.slice(indexOfFirst, indexOfLast);
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast); // 수정하기 - 검색결과를 가지고 페이지네이션을 다시 새로 표시함

  // 전체 페이지 수 totalPage = Math.ceil(13/5)=3, 무조건 올림
  // 예) 페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오게 한다
  // const totalPage = Math.ceil(data.length / itemPerPage);
  const totalPage = Math.ceil(filteredData.length / itemPerPage); // 수정하기 - 페이지네이션을 기준으로 filteredData 변경함

  // 시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  // 만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시 보정
  startPage = Math.max(1, endPage - 4);

  // 페이지 번호 배열(1-5고정, 또는 totalPage까지 제한 1,2,3,4,5)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <>
      <h2>Goods</h2>
      <table className='data-list data-list-goods'>
        <thead>
          <tr>
            <th>g_code(코드번호)</th>
            <th>g_name(상품명)</th>
            <th>g_cost(상품가격)</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.length > 0 ?
              (
                currentItems.map(item => (
                  // data.map(item => (
                  <tr key={item.g_code}>
                    <td>{item.g_code}</td>
                    <td>{item.g_name}</td>
                    <td>{item.g_cost}</td>
                    <td>
                      <button className='btn-change'>수정</button>
                      <button className='btn-delete'>삭제</button>
                    </td>
                  </tr>
                ))
              ) :
              (
                <tr>
                  <td colSpan='4'>검색 결과가 없습니다.</td>
                </tr>
              )
          }
        </tbody>
      </table >

      {/* 페이지네이션 */}
      <div className="pagenation-box">
        {/* 이전 버튼 */}
        {
          currentPage > 1 &&
          <button
            className="pagenation-btn pagenation-btn-prev"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            이전
          </button>
        }

        {/* 숫자 버튼 */}
        {
          pageNumbers.map(number => (
            <button
              className={`pagenation-btn pagenation-btn-num ${currentPage === number ? 'act' : ''}`}
              key={number}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))
        }

        {/* 다음 버튼 */}
        {
          currentPage < totalPage &&
          <button
            className="pagenation-btn pagenation-btn-next"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
          </button>
        }
      </div>

      {/* 키워드 검색폼 - 검색창에 검색단어만 입력해도 바로 검색되는 양식 */}
      <div className='search-box'>
        <input
          type="text"
          placeholder='상품명 검색'
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setCurrentPage(1); // 검색은 항상 1페이지부터
          }}
        />
      </div>
    </>
  );
};

export default Goods;