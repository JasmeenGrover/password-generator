// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (specialCharAllowed) {
      str += "`~!@#$%^&*()_+-={}|[]:;'<>,.";
    }

    for (let i = 1; i <= length; i++) {
      //random array index value
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      //picking char from string and 
      pass += str.charAt(char);
    }

    //set password 
    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password )
  },[password])
  
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed,specialCharAllowed,passwordGenerator])

  return (
    <>
      Radhe Radhe
      {/* <h1 className='text-4xl text-center text-white'>Radhe Radhe</h1> */}
      {/* <h1 className='text-4xl text-center text-white'>Password Generator</h1> */}

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        {/* Radhe Radhe */}
        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            ref={passwordRef}
            readOnly
            name="" id="" />
            
            <button type="button" className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed} 
            id='numberInput'
            onChange={() => {setNumberAllowed((prev) => !prev)}}
            />

            <label htmlFor="numberInput">Numbers</label>
          </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={specialCharAllowed}
              id='charInput'
              onChange={() => {setSpecialCharAllowed((prev) => !prev)}}
              />

              <label htmlFor="charInput"> Character</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
