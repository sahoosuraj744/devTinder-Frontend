import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import {useDispatch, useSelector} from 'react-redux'
import {addRequests} from '../utils/requestSlice'
import {useEffect} from 'react'
const Requests = () => {
  const requests=useSelector((store)=>store.requests)
  const dispatch=useDispatch()
  const fetchRequest=async()=>{
  const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
    dispatch(addRequests(res.data.data))
  }
  useEffect(()=>{
    fetchRequest()
  },[])
   if(!requests) return
    if (requests.length===0) return <h1>No Request Found</h1>
  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connection Request</h1>
        {requests.map((request)=>
      
          {
             const {_id,firstName,lastName,photoUrl,gender,age}=request.fromUserId
              return (<div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/2 mx-auto">
                <div> <img src={photoUrl} alt="" className="w-20 h-20 rounded-full" /></div>
                <div className="text-left mx-4">
                   <h2 className="font-bold text-xl">{firstName +" "+lastName}</h2>
                   <p>{age +", "+gender}</p>
                </div>
                <div><button className="btn btn-primary mx-2">Reject</button>
                    <button className="btn btn-secondary mx-2">Accept</button></div>
        </div> ) })}
    </div>
  )
}

export default Requests