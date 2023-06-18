
import { useEffect, useState } from "react";
import DetailsForm from "./components/DetailsForm";
import DetailsList from "./components/DetailsList";
import axios, { CanceledError } from "axios";
import {CgSpinnerAlt} from 'react-icons/cg'

function App() {
  const [users, setUsers] = useState([]);
  const [error,setError] = useState('')
 const [isLoading,setLoading]= useState(false)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    axios
      .get(
        "http://ec2-16-16-75-130.eu-north-1.compute.amazonaws.com:9091/demo/all",{signal:controller.signal}
      )
      .then((res) => {
       setUsers(res.data)
       setLoading(false)
      }).catch(err=>{if(err instanceof CanceledError) return
        setError(err.message)
        setLoading(false)
      })
      return ()=>controller.abort()
  },[]);
 
  const handleAddUser=(user)=>{
    const originalUsers = [...users]
    setUsers(users=>[...users,user])
    console.log(users)
    axios.post(`http://ec2-16-16-75-130.eu-north-1.compute.amazonaws.com:9091/demo/add?name=${user.name}&email=${user.email}`)
    .then(res=>{console.log(res)
      setUsers([res.data,...users])}).catch(err=>{
      setError(err.message)
      setUsers(originalUsers)
    })
  }
  return (
    <main className="flex flex-col items-center mt-10 gap-10">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#0968e5] text-transparent bg-clip-text to-[#091970]">
        Details
      </h1>
      <DetailsForm onAddUser={handleAddUser}/>

      <DetailsList users={users} />
     {isLoading&& <div className=" animate-spin w-8 h-8"><CgSpinnerAlt/></div>}


      {error&&<p className="text-red-500">{error}</p>}
    </main>
  );
}

export default App;
