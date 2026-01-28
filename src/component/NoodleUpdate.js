import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoodleUpdate = () => {
  const { num } = useParams();

  const [input, setInput] = useState({
    num: '',
    name: '',
    company: '',
    kind: '',
    price: '',
    e_date: '',
  })

  const navigate = useNavigate();

  // 조회
  useEffect(() => {
    axios.get(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/noodle/${num}`)
      .then(res => {
        console.log('성공 : ', res)
        setInput(res.data)
      })
      .catch(err => console.log('실패 : ', err))
  }, [num])

  // 수정
  const inputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const inputSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/noodle/noodleupdate/${num}`, input)
      .then(() => {
        alert('수정 완료되었습니다.');
        navigate('/noodle');
      })
      .catch(err => console.log('실패 : ', err))
  }

  return (
    <>
      <h2>Noodle DB 입력 실습</h2>

      <form onSubmit={inputSubmit}>
        <div>
          <label htmlFor="num">번호 : </label>
          <input type="text" name="num" id="num" value={input.num} readOnly />
        </div>

        <div>
          <label htmlFor="name">제품명 : </label>
          <input type="text" id='name' name='name' value={input.name} onChange={inputChange} required />
        </div>

        <div>
          <label htmlFor="company">회사 : </label>
          <input type="text" id='company' name='company' value={input.company} onChange={inputChange} required />
        </div>

        <div>
          <label htmlFor="kind">종류 : </label>
          <select name="kind" id="kind" value={input.kind} onChange={inputChange} required>
            <option value="">옵션을 선택하세요</option>
            <option value="M">M</option>
            <option value="C">C</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">가격 : </label>
          <input type="number" id='price' name='price' value={input.price} onChange={inputChange} required />
        </div>

        <div>
          <label htmlFor="e_date">유통기한 : </label>
          <input type="text" id='e_date' name='e_date' value={input.e_date} onChange={inputChange} required />
        </div>

        <input type="submit" value="수정 완료" />
      </form >
    </>
  );
};

export default NoodleUpdate;