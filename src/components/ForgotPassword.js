import { TextField } from '@mui/material'
import React , {useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';

const RESET_PASSWORD_REGEX = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-])[A-Za-z0-9@$!%*?&]{8,}$'
)

const ForgotPassword = () => {


    const [email, setemail] = useState('')

    const [otp, setotp] = useState('')

    const [userotp, setuserotp] = useState('')

    const [show, setshow] = useState(false)

    const [newpassword, setnewpassword] = useState('')

    const [confirmpassword, setconfirmpassword] = useState('')

    const [success, setsuccess] = useState(false)


    const OTP = () => 
    {

        const OTP_URL = `http://localhost:8080/user/send-otp/${email}`

        try {
            axios.post(
                OTP_URL , email ,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
            ).then((res) => setotp(res.data.message))
        } catch (error) {
            alert(error)
        }
    }

    const ForgotPassword = () => 
    {

        const resetPasswordDto = {
            newPassword : newpassword ,
            confirmPassword : confirmpassword
        }

        try {
            axios.post(
                `http://localhost:8080/user/forgot-password/${email}`,
                resetPasswordDto
            )
            .then((res) => console.log("kjsdhsgkblasgdasfhjdshnodfsohpsd o"+res))
            setsuccess(true)
        } catch (error) {
            alert(error.res.data.msg)
        }
        
    }


  return (
    <div className='forgot-password'>
        {
            success ? <h1>
                Login <a href='/login'>here</a>
            </h1>
            :
            show ? (
                <div>
                    <p
                        style={
                            {
                                'color' : 'red',
                                'fontFamily':"cursive",
                                'fontSize' : "12px",
                                'textAlign' : 'center'
                            }
                        }
                    >
                        Password Must Contain atlease 1 UpperCase , LowerCase , Special Character and Length b/w 8 to 12</p>
                    <TextField required
                        value={newpassword}
                        onChange={(e) => setnewpassword(e.target.value)}
                        id="outlined-required"
                        label="Newpassword"
                        autoComplete="off"
                    />
                    <br/>
                    <br/>
                    <TextField required
                        value={confirmpassword}
                        onChange={(e) => setconfirmpassword(e.target.value)}
                        id="outlined-required"
                        label="Confirmpassword"
                        autoComplete="off"
                    />
                    <br/>
                    <br/>
                    <button 
                        onClick={() => ForgotPassword()}
                        disabled={ RESET_PASSWORD_REGEX.test(newpassword) && newpassword.match(confirmpassword)
                            ? false : true }
                        >
                            Send otp</button>
                </div>
            ) : (
                    otp ? (<div>
                        <TextField required
                                                value={userotp}
                                                onChange={(e) => setuserotp(e.target.value)}
                                                id="outlined-required"
                                                label="OTP"
                                                autoComplete="off"
                                            />
                                            <p onClick={() => {
                                                otp === userotp ? setshow(true) : (alert("OTP Invalid"))
                                            }}><DoneIcon/></p>
                    </div>) : (<div>
                        <h6>Enter your mail </h6>
                        <TextField required
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                id="outlined-required"
                                                label="Email"
                                                autoComplete="off"
                                            />
                                            <br/>
                        <p onClick={() => {OTP()}}><SendIcon/></p>
                    </div> )
            )
        }
    </div>
  )
}

export default ForgotPassword