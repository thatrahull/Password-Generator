import { useState, useCallback, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()<?"

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    alert('Password copied to clipboard!')
  }           

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-whute text-center mb-4'>Password Generator</h1>
      
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-2 px-3 text-white'
          placeholder='Password'
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 hover:bg-blue-600 transition-colors'
        >
          Copy
        </button>
      </div>
      
      <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm'>
        <div className='flex items-center gap-x-2'>
          <input 
            type="range"
            min={6}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        
        <div className='flex items-center gap-x-2'>
          <input 
            type="checkbox"
            checked={numberAllowed}
            id='numberInput'
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        
        <div className='flex items-center gap-x-2'>
          <input 
            type="checkbox"
            checked={charAllowed}
            id='charInput'
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )     
}

export default App