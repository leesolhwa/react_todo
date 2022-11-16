import React from 'react'
import { FiDelete } from 'react-icons/fi';
//https://react-icons.github.io/react-icons/ 리액트 아이콘
//'react-icons/bs' 뒤에 두글자는 쓰는 아이콘에 앞 두글자 
import styles from './Todo.module.css';


  const Todo = ({ todo, onUpdate, onDelete }) => {
    const {text, status} = todo;  //간쳔하게 사용을 위해 todo에서 할당
    const handleChange =(e)=>{
      //받아온게 아님 이 컴포넌트 내부에서만 사용
      const status = e.target.checked ? "completed" : "active";
      onUpdate({...todo, status}); //브라우저 Conponents에서 status변하는거 확인!
    }

    const handleDelete = () => onDelete(todo);
  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="checkbox"
        checked={status == "completed"}
        onChange={handleChange}
      />
      <label className={styles.text}>{text}</label>
      <span className={styles.icon}>
        <button className={styles.button} onClick={handleDelete}>
          <FiDelete />
        </button>
      </span>
    </li>
  )
};

export default Todo;