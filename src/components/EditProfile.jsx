import {useState} from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import {BASE_URL} from'../utils/constants'
import {useDispatch} from 'react-redux'
import { addUser } from '../utils/userSlice'
const EditProfile = ({user}) => {
      const[firstName,setFirstname]=useState(user.firstName)
      const[lastName,setLastName]=useState(user.lastName)
      const[age,setAge]=useState(user.age)
      const[photoUrl,setPhotoUrl]=useState(user.photoUrl)
      const[gender,setGender]=useState(user.gender)
      const[about,setAbout]=useState(user.about)
      const[error,setError]=useState("")
      const[showToast,setShowToast]=useState(false)
      const dispatch=useDispatch()
      const saveProfile=async()=>{
        setError("")
        try {
            const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials:true})
            dispatch(addUser(res?.data))
            setShowToast(true)
            setTimeout(()=>{
              setShowToast(false)
            },2000)

        } catch (error) {
            setError(error.response.data)
        }
      }
  return (
    <>
  <div className="flex justify-center gap-5 my-10">
     <div className="flex justify-center">
    <div className="card bg-base-200 w-96 shadow-sm">
  <div className="card-body ">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
      <fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1">First Name</legend>
  <input type="text" className="input input-sm" value={firstName}
  onChange={(e)=>setFirstname(e.target.value)}/>
  </fieldset>
<fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1">Last Name</legend>
  <input type="text" className="input input-sm" value={lastName}
  onChange={(e)=>setLastName(e.target.value)}/>
</fieldset>
<fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1">Age</legend>
  <input type="text" className="input input-sm" value={age}
  onChange={(e)=>setAge(e.target.value)}/>
</fieldset>

<fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1">Gender</legend>
  <select
    value={gender || ""}
    onChange={(e) => setGender(e.target.value)}
    className="select select-sm"
  >
    <option value="" disabled>
      Select Gender
    </option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Others</option>
  </select>
</fieldset>
{/* <fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1"> About</legend>
  <input type="text" className="input input-sm" value={about}
  onChange={(e)=>setAbout(e.target.value)}/>
</fieldset> */}
<fieldset className="fieldset my-0.5">
  <legend className="fieldset-legend py-1">About</legend>
  <textarea
    className="textarea textarea-sm"
    placeholder="Bio"
    value={about || ""}
    onChange={(e) => setAbout(e.target.value)}
  ></textarea>
</fieldset>
<fieldset className="fieldset my-1">
  <legend className="fieldset-legend py-1"> Photo Url</legend>
  <input type="text" className="input input-sm" value={photoUrl}
  onChange={(e)=>setPhotoUrl(e.target.value)}/>
</fieldset>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
</div>
{showToast && (
<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully</span>
  </div>
</div>
  )}
</>
  )
}

export default EditProfile