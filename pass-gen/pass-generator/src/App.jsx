 import {useState , useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setnumberallowed] =useState(false);
  const [char, setChar]=useState(false);
  const [password, setPassword]=useState("")



  //useRef hook
  const passref=useRef(null);


  const passgenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str += "1234567890"
    if(char) str += "!@#$%^&*(){}[]+=~`"

    for (let i = 1; i <= length; i++) {
      let c=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(c)
    }
    setPassword(pass);
  }, [length, numberallowed, char, setPassword])
  
  useEffect(()=>{
    passgenerator()
  },[length,numberallowed, char, passgenerator])
  


  const copypass=useCallback(()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(3,5)
    window.navigator.clipboard.writeText(password);
  },[password])
  

  return (
    <>
    
    <div className='w-full max-w-md mx-auto text-center shadow-md   
    rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <div><h1 className='text-white text-center py-3'>PassWord generator</h1>
      <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="Type your password"
      readOnly
      ref={passref}
      />
      <button
      onClick={copypass}
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy </button>
    </div>
    <div>
      <div>
        <input 
          type="range"
          min={6}
          max={100}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
        /> <label>Length:{length}</label>
      </div>
      <div>
        <input 
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={()=>{setnumberallowed((prev)=>!prev);}}
        /> <label>Numbers</label>
      </div>
      <div>
        <input 
          type="checkbox"
          defaultChecked={char}
          id="characterInput"
          onChange={()=>{setChar((prev)=>!prev);}}
        /> <label>Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
