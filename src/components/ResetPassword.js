import axios from 'axios'
import React , {useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';

const ResetPassword = (props) => {

    const [newPassword, setnewPassword] = useState('')
    
    const [success, setsuccess] = useState(false)

    const [user_id, setuser_id] = useState()
    

    const USER_ID_URL = `http://localhost:8080/user/${props.location.state}`


    useEffect(() => {

        axios.get(
            USER_ID_URL
        )
        .then((res) => {
            setuser_id(res.data)}
        )
    },[user_id])


    console.log("---"+localStorage.getItem(props.location.state))
    

    const setPassword = async () =>
    {
        const requestBody = {passWord : newPassword}

        try {
            await axios.put(
                `http://localhost:8080/user/reset-password/${user_id}` , requestBody ,
                {
                    headers:{
                        'Authorization': 'Bearer '+localStorage.getItem(props.location.state)
                    }
            }
            )
            .then(
                (res) => console.log(res)
                )
            setsuccess(true) 
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
        {
            success ? <a href='/login'>Login Again</a> : ( 
                <div>
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