import { useState } from "react";
function App() {
  let [counter,setCounter]=useState(15);
  //let counter=5
  const addv= ()=> {
    console.log("clicked" , counter);

    if(counter<20) setCounter(counter+1);
  }
  const remv= ()=>{
    console.log("clicked",counter);
    
    if(counter>0) setCounter(counter-1);
  }
  return (

    <>
      <h1>Chai or react</h1>
      <h2>counter : {counter}</h2>

      <button onClick={addv}> add {counter}</button>
      <button onClick={remv}> subtract {counter} </button>
    </>
  )
}

export default App
