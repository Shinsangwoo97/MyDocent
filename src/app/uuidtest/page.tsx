'use client'
import useStore from '../uuid/page';

export default function Uuidtest() {

  const add = () => {
  useStore.getState().addUuid('test11');  
  console.log("추가", useStore.getState().uuidList);
 
}
  const deleted = () => {
    useStore.getState().removeUuid('test11');  
    console.log("삭제",useStore.getState().uuidList);
  }

  const Check = () => {
    let result = useStore.getState().checkUuid('test11');
    console.log("확인", result);
  }


  return (
    <>
    <button onClick={add}>추가</button>
    <button onClick={deleted}>삭제</button>
    <button onClick={Check}>UUID 확인</button>
    </>
  );
}
