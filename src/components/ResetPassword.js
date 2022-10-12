import axios from 'axios'
import React , {useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';


const RESET_PASSWORD_REGEX = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-])[A-Za-z0-9@$!%*?&]{8,}$'
)

const ResetPassword = (props) => {

    const [newPassword, setnewPassword] = useState('')
    
    const [success, setsuccess] = useState(false)

    const [user_id, setuser_id] = useState()

    const [text, settext] = useState(false)
    

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
         <p className='reset_password_condition'>Your Password must contain atleast one UpperCase , one Special Character , one Digit , one SmallCase and Length between 8 to 12</p>
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
                    }}
                    disabled={RESET_PASSWORD_REGEX.test(newPassword) ? false : true }
                    >Reset</button>
                </div>
            )
        }
    </div>
  )
}

export default ResetPassword