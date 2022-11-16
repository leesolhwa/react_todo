import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
//https://www.npmjs.com/package/uuid  - 자동으로 고유키값을 생성
import styles from './AddTodo.module.css';

const AddTodo = ({onAdd}) => {
  const [text, setText] = useState('');
  const handleChange = (e)=> setText(e.target.value);   //인풋에 입력할때 바뀌는 것을 인식
  const handleSubmit = (e)=> {    //form고유의 submit기능이 작동되면 발생하는 함수
    e.preventDefault();   //페이지가 리페이지 되는것을 
        
    if(text.trim().length === 0){
      return;
    }
    //trim() - 빈부분을 잘라줌
    //입력된게 없을때는 handleSubmit함수 에서 빠져나감 (!text - 스페이스여백은 못 걸러냄)

    onAdd({id:uuidv4(), text, status:'active'}); //onAdd함수 실행 자동으로 아이디 랜덤값을 만들어줌
    setText('');  //서브밋 버튼 누른 후 인풋 창 초기화
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder='오늘의 할일은?'
        value={text}
        onChange={handleChange} //변경될때마다 handleChange호출
      />
      <button className={styles.button}>Add</button>
    </form>
  )
}

export default AddTodo