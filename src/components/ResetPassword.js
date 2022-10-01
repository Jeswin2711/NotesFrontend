import axios from 'axios'
import React , {useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';


const ResetPassword = (props) => {

    const [newPassword, setnewPassword] = useState('')
    
    const [success, setsuccess] = useState(false)

    const [user_id, setuser_id] = useState()
    

    const USER_ID_URL = `http://localhost:8080/user/${props.location.state}`

    const URL = `http://localhost:8080/user/reset-password/${user_id}` 


    useEffect(() => {

        axios.get(
            USER_ID_URL
        )
        .then((res) => {
            setuser_id(res.data)}
        )
    },[])
    

    const setPassword = async () =>
    {
        const requestBody = {passWord : newPassword}

        const headers = {
            headers : {
                Authorization :`Bearer ${localStorage.getItem(props.location.state)}`,
                "Access-Control-Max-Age":1728000
                
            }
        } 

        try {
            await axios.post(URL , requestBody , headers)
            setsuccess(true) 
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        {
            success ? <a href='/login' className='after-reset'>Login Again</a> : ( 
                <div className='reset'>
                    <TextField
                    id="outlined-password-input"
                    label="New Password"
                    autoComplete="off"
                    required
                    value={newPassword} onChange={(e) => setnewPassword(e.target.value)}
                    />
                    <button onClick={() => {
                    setPassword()
                    }}>Submit</button>
                </div>
            )
        }
    </div>
  )
}

export default ResetPassword