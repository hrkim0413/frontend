import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../AlertContext";

const NoodleCreate = () => {
  const [input, setInput] = useState({
    name: '',
    company: '',
    kind: '',
    price: '',
    e_date: '',
  })
  const { setNoodleCount } = useContext(AlertContext);

  const navigate = useNavigate();

  const inputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const inputSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9070/noodle', input)
      .then(() => {
        alert('제품이 등록 완료되었습니다.');
        setNoodleCount(count => count + 1);
        navigate('/noodle');
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2>Noodle DB 입력 실습</h2>

      <form onSubmit={inputSubmit}>
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

        <input type="submit" value="등록 완료" />
      </form >
    </>
  );
};

export default NoodleCreate;