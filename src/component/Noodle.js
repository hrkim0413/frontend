import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Noodle = () => {
  // 1. 상태변수 선언
  const [data, setData] = useState([]);
  // 5. 페이지 이동을 위한 navagate 선언
  const navigate = useNavigate();

  // 2. 비동기통신을 함수에 담기
  const loadData = () => {
    axios.get('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/noodle')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }

  // 3. useEffect를 통해 한번만 실행되도록 함
  useEffect(() => {
    loadData();
  }, [])

  // 4. 데이터 삭제 함수
  const dataDelete = (num) => {
    if (window.confirm('선택하신 제품을 삭제하시겠습니까?')) {
      axios.delete(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/noodle/${num}`)
        .then(() => {
          alert('삭제되었습니다.')
          loadData(); // 목록 갱신
        })
        .catch(err => console.log(err))
    }
  }

  // 5. 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5; // 한페이지에 보여줄 아이템 개수

  const indexOfLast = currentPage * itemPerPage; // 예) 1*5=5
  const indexOfFirst = indexOfLast - itemPerPage; // 예) 5-5=0

  const currentData = data.slice(indexOfFirst, indexOfLast); // 현재페이지에서 보여지는 아이템 (예. data[0], data[1], data[2], data[3], data[4])

  const totalPage = Math.ceil(data.length / itemPerPage); // 전체 페이지 개수 (예. 16/5=3.2인데 올림 함수를 사용해서 4가 나옴)

  // s: 이해가 안가니까 그냥 외워야 하는 부분
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);
  startPage = Math.max(1, endPage - 4)

  // const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  // e: 이해가 안가니까 그냥 외워야 하는 부분

  return (
    <>
      <h2>Noodle 실습</h2>

      <div className="write-box">
        <button className="btn-write" onClick={() => navigate('/noodle/noodlecreate')}>글쓰기</button>
      </div>

      <table className="data-list data-list-noodle">
        <thead>
          <tr>
            <th>No.</th>
            <th>제품명</th>
            <th>회사</th>
            <th>종류</th>
            <th>가격</th>
            <th>유효기한</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            // data.map(item => (
            currentData.map(item => (
              <tr key={item.num}>
                <td>{item.num}</td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.kind}</td>
                <td>{item.price}</td>
                <td>{item.e_date}</td>
                <td>
                  <button className="btn-change" onClick={() => navigate(`/noodle/noodleupdate/${item.num}`)}>수정</button>
                  <button className="btn-delete" onClick={() => dataDelete(item.num)}>삭제</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="pagenation-box">
        <button
          className="pagenation-btn pagenation-btn-prev"
          onClick={() => { setCurrentPage(currentPage - 1) }}
          disabled={currentPage === 1}
        >
          이전
        </button>

        {
          pageNumbers.map(num => (
            <button
              className={`pagenation-btn pagenation-btn-num ${num === currentPage ? 'act' : ''}`}
              key={num}
              onClick={() => { setCurrentPage(num) }}
            >
              {num}
            </button>
          ))
        }

        <button
          className="pagenation-btn pagenation-btn-next"
          onClick={() => { setCurrentPage(currentPage + 1) }}
          disabled={currentPage === endPage}
        >
          다음
        </button>
      </div>
    </>
  )
}

export default Noodle;