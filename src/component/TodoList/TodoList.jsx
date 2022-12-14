//Todo아이템의 상태를 저장해서 다시 열었을때도 그대로

import React, {useState, useEffect} from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

const TodoList = ({filter }) => {
    //미리 입력해둔 todos가 아니라 이미 저장된 값을 가져온다 
    const [todos, setTodos] = useState(readTodosFromLocalStorage());
    //코드가 너무 길어져서 함수로 만들었음. - 맨밑에 있음 

  const handleAdd = (todo)=>{
    setTodos([...todos, todo]);
  };
  const handleUpdate = (updated) => {
    setTodos(todos.map((t)=>(t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));
  
  const filtered = getFilteredItems(todos, filter);  //필터링 해주는 함수실행

  //todos가 업데이트 될 때 적용 
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])
  //JSON.stringify() - 객체나 배열을 JSON 문자열로 변환해서 localStorage에 저장

  return(
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item)=>(
          <Todo
            key={item.id}
            todo = {item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd}/>
    </section>
  );
};

//todoList 컴퍼넌트 바깥 부분에 필터링하는 함수 정의 
function getFilteredItems(todos, filter){
  if(filter === 'all'){
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

//localStorage에 저장된 todos를 가져와서 오브젝트 형식으로 변환
function readTodosFromLocalStorage(){
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}



export default TodoList