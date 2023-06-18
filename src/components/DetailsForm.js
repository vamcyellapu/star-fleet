

import { useState } from "react";

function DetailsForm({onAddUser}) {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
const handleSubmit= (e)=>{
  e.preventDefault()
  if(!name || !email) return
  const newUser = {
    name,email
  }
  onAddUser(newUser)

  setName('')
  setEmail('')
}
  return (
    <form className="flex flex-col sm:flex-row gap-2 " onSubmit={handleSubmit}>
      <input
        className="border-2 p-2 rounded-lg"
        placeholder="Enter your name"
        type="text"
        value={name}
onChange={(e)=>setName(e.target.value) }
      />
      <input
        className="border-2 p-2 rounded-lg"
        placeholder="Enter your email"
        type="email"
        onChange={(e)=>setEmail(e.target.value) }
        value={email}
      />
      <button
        type="submit"
        className="bg-[#0968e5] text-white px-4 py-2 rounded-lg"
      >
        Add Details
      </button>
    </form>
  );
}

export default DetailsForm;
