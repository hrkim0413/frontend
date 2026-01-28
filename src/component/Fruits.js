import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../AlertContext";

const Fruits = () => {
  // [조회]
  // 1. 상태변수
  const [data, setData] = useState([]);
  const { setFruitsCount } = useContext(AlertContext);

  // 2. 리스트 조회(출력)
  const loadData = () => {
    // 비동기 통신 사용
    axios
      .get('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/fruits')
      // 성공시 데이터를 저장
      .then(res => {
        setData(res.data);
        setFruitsCount(res.data.length);
      })
      // 실패시 에러 출력
      .catch(err => console.log(err))
  }

  // 3. 컴포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, [])


  // [삭제]
  // 1. 선택한 자료 삭제하기
  const deleteData = (num) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/fruits/${num}`)
        .then(() => { // 성공시
          alert('삭제되었습니다.');
          loadData(); // 삭제 후 다시 불러와서 목록을 새로고침
        })
        .catch(err => console.log(err)) // 오류시 에러 출력
    }
  }


  // [입력]
  const navigate = useNavigate(); // 글쓰기 버튼을 클릭시 컴포넌트 주소로 이동하기 위함


  // [검색]
  const [inputKeyword, setInputKeyword] = useState(''); // 검색어 입력용
  const [keyword, setKeyword] = useState(''); // 실제 검색에 사용될 키워드

  // 검색 버튼 클릭시 검색을 위한 함수
  const handleSearch = () => {
    setKeyword(inputKeyword); // 검색단어 확정
    setCurrentPage(1); // 1페이지로 이동
  }

  // 키보드 'Enter'키를 눌러도 검색이 되도록 함
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  // 검색 후 리셋을 위한 함수
  const handleReset = () => {
    setInputKeyword(''); // input에 적혀 있는 입력값 제거
    setKeyword(''); // 검색 키워드를 제거 => 모든 리스트가 보이게 함
    setCurrentPage(1); // 1페이지로 이동
  }

  // 필터링 : 검색시 name(과일명)을 기준으로 검색
  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );


  // [페이지네이션]
  const [currentPage, setCurrentPage] = useState(1); //초기값 1
  const itemsPerPage = 5; //한 페이지에 보여지는 게시물 수

  //현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻.
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산 10 - 5 = 5,  5번째부터 9번째 아이템까지 보여줍니다 (slice는 끝 인덱스 미포함).
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data 배열 중 현재 페이지에 해당하는 부분만 잘라냅니다. 
  //예: data.slice(5, 10) → data[5], data[6], data[7], data[8], data[9]만 화면에 표시.
  // const currentItems = data.slice(indexOfFirst, indexOfLast);
  const currentItems = filterData.slice(indexOfFirst, indexOfLast); // 수정 - data > filterData로 변경

  //전체 페이지 수 totalpage = Math.ceil(13 / 5) = 3, 무조건 올림
  //페이지 번호는 게시물이 13개 있는 경우 1,2,3까지 나오도록 한다.
  // const totalPage = Math.ceil(data.length / itemsPerPage);
  // const totalPage = Math.ceil(filterData.length / itemsPerPage); // 수정1 - data > filterData로 변경
  const totalPage = Math.max(1, Math.ceil(filterData.length / itemsPerPage)); // 수정2 - totalPage가 0이 되는 경우를 방지해야해서 무조건 최소값은 1로 고정

  // 시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  // 만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시 보정
  startPage = Math.max(1, endPage - 4);

  // 페이지 번호 배열(1-5고정, 또는 totalPage까지 제한 1,2,3,4,5)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <>
      <h2>Fruits</h2>
      <div className="write-box">
        <button className="btn-write" onClick={() => navigate('/fruits/fruitscreate')}>글쓰기</button>
      </div>
      <table className='data-list data-list-fruits'>
        <thead>
          <tr>
            <th>번호</th>
            <th>과일명</th>
            <th>가격</th>
            <th>색상</th>
            <th>원산지</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            // 삼항조건연산자를 사용하여 조회된 데이터 개수가 0보다 크면 출력되게 함
            currentItems.length > 0 ?
              currentItems.map(fruit => (
                // data.map(fruit => (
                <tr key={fruit.num}>
                  <td>{fruit.num}</td>
                  <td>{fruit.name}</td>
                  <td>{Number(fruit.price).toLocaleString()}</td>
                  <td>{fruit.color}</td>
                  <td>{fruit.country}</td>
                  <td>
                    <button className='btn-change' onClick={() => navigate(`/fruits/fruitsupdate/${fruit.num}`)}>수정</button>
                    <button className='btn-delete' onClick={() => deleteData(fruit.num)}>삭제</button>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan='6'>검색 결과가 없습니다.</td>
              </tr>
          }
        </tbody>
      </table>

      <div className="pagenation-box">
        <button
          className="pagenation-btn pagenation-btn-prev"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

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

        <button
          className="pagenation-btn pagenation-btn-next"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          다음
        </button>
      </div>

      {/* 키워드 검색폼 - 검색창에 검색단어를 입력하고 검색버튼 클릭시 검색되게 하기 */}
      <div className='search-box'>
        <input
          type="text"
          placeholder='상품명 검색'
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="search-btn">검색</button>
        <button onClick={handleReset} className="reset-btn">초기화</button>
      </div>
    </>
  )
}

export default Fruits;