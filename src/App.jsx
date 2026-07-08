import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const App = () => {

  const maxlength = 100
  const [password, setPassword] = useState('')
  const [lengths, setLength] = useState(8)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharacaterAllowed, setIsCharacterAllowed] = useState(false)
  const[savePassword, setsavePassword] = useState([])

  const passwordRef = useRef()
  

  // console.log(savePassword)
  // console.log(lengths)
  // console.log(isNumberAllowed)
  // console.log(isCharacaterAllowed)

  const generatePassword = () => {
    let pass = ""

    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (isNumberAllowed) str += "0123456789"
    if (isCharacaterAllowed) str += "`~@#$%^*"

    for (let i = 1; i <= lengths; i++) {
      let randomIndex = Math.floor(Math.random() * str.length)
      let characterPicked = str.charAt(randomIndex)
      pass += characterPicked
    }

    setPassword(pass)

  }

  // when every lengths , isNumberAllowed and isCharacaterAllowed chage useEffect run
  useEffect(() => {
    generatePassword()
  }, [lengths, isNumberAllowed, isCharacaterAllowed])


  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password)
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0,maxlength)

  }


  return (
    <div className='flex flex-col gap-5 max-w-200   m-auto '>

      <h1 className='text-center mt-5 font-bold text-4xl'>Password Generator</h1>



      <input
        type='text'
        placeholder='Password'
        value={password}
        readOnly={true}
        ref = {passwordRef}
        className='outline-none border-none bg-gray-200 px-3
        py-1 rounded-lg text-black flex  justify-center 
        h-15
      '>
      </input>


      <input
        type='range'
        min={0}
        max={maxlength}
        value={lengths}
        className='bg-red-500'
        onChange={(e) => setLength(e.target.value)}
      >
      </input>

      <label htmlFor='numberAllowed'
        className='text-xl'>
        <input
          id='numberAllowed'
          type='checkbox'
          checked={isNumberAllowed}
          onChange={(e) => setIsNumberAllowed(e.target.checked)}
        />
        Number Allowed
      </label>


      <label htmlFor='CharacterAllowed'
        className='text-xl'>
        <input
          id='CharacterAllowed'
          type='checkbox'
          checked={isCharacaterAllowed}
          onChange={(e) => setIsCharacterAllowed(e.target.checked)}
        />
        Character Allowed
      </label>


      <button className='bg-blue-500 px-3 py-1 rounded-lg h-15
      cursor-pointer text-2xl
      '
      onClick={copyPasswordToClipboard}
      >Copy Password</button>

      <button className='bg-blue-500 px-3 py-1 rounded-lg h-15
      cursor-pointer text-2xl'
        onClick={() => {
          setLength(8)
          setIsNumberAllowed(false)
          setIsCharacterAllowed(false)
        }}
      >Rest Password</button>

      <button className='bg-blue-500 px-3 py-1 rounded-lg h-15
      cursor-pointer text-2xl
      '
      onClick={() => {
        setsavePassword((prev) => ([...prev, password]))
      }}
      >Save Password</button>

    {
      savePassword.map((item, index) => (
        <p className='text-xl' key={index}>{item}</p>
      ))
    }  


    </div>
  )
}

export default App