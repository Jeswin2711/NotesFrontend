import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material";
import axios from "../../api/apis";
import { Link } from "react-router-dom";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const LOGIN_URL = "/login"

const LoginComponent = () => {

    const [userName, setusername] = useState('')
    const [passWord, setpassword] = useState('')
    const [success, setsuccess] = useState(false)
    const [errMsg, seterrMsg] = useState(false)


    useEffect(() => {
        seterrMsg('')
    }, [userName, passWord])


    useEffect(() => {
        setusername('')
        setpassword('')
    }, [])

    const login = async (e) => {
        e.preventDefault();
        const credential = { userName, passWord }
        console.log("asdadsasdas")
        try {
            await axios.post(
                LOGIN_URL, credential,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                localStorage.setItem(userName , response.data.message)
            })
            setsuccess(true)
        }
        catch (err) {
            if(err.response.status === 500)
            {
                seterrMsg('Internal Server Error')
            }
            else
            {
                seterrMsg(err.response.data.msg);
            }
            
        }
    }

    return (
        <>
            {
                success ?
                    (
                            <section className="App">
                                <h1>Success!</h1>
                                
                                <Link to={{ 
                                    pathname: "/notes", 
                                    state: userName
                                    }}>
                                    <HomeOutlinedIcon/>
                                    </Link>

                            </section>
                    ) :
                    (
                        <div className="App">
                            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <TextField required
                                value={userName}
                                onChange={(e) => setusername(e.target.value)}
                                id="outlined-required"
                                label="Username"
                                autoComplete="off"
                            />
                            <br/>
                            <br/>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                autoComplete="off"
                                required
                                value={passWord} onChange={(e) => setpassword(e.target.value)}
                            />
                            <br/>
                            <br/>
                            <Button onClick={login} disabled={!userName || !passWord ? true : false}><LoginTwoToneIcon/></Button>
                            <br/>
                            <h6>
                                New User ? Register
                                <a href="/"> here</a>
                            </h6></div>
                    )
            }
        </>

    )
}

export default LoginComponent;