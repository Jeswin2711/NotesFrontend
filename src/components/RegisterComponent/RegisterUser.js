import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button, FormControl } from "@mui/material";
import axios from "../../api/apis";


const REGISTER_URL = "/register"

const RegisterUser = () => {
    const [userName, setusername] = useState('')
    const [passWord, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [phoneNumber, setphonenumber] = useState();
    const [success, setsuccess] = useState(false)
    const [errMsg, seterrMsg] = useState(false)


    useEffect(() => {
        seterrMsg("")
    }, [userName, passWord])


    const register = async (e) => {
        e.preventDefault()
        const user = { userName, passWord, email, phoneNumber }
        try {
            await axios.post(
                REGISTER_URL, user,
                {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setsuccess(true)
        }
        catch (err) {
            seterrMsg(err.response.data.msg);
        }
    }

    return (
        <>
            {
                success ? (
                    <section className="App">
                        <h1>
                            Register successfull
                            Click here to <a href="/login">Login</a>
                        </h1>
                    </section>)
                    :
                    (
                        <div className="App">
                            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h2>Sign Up</h2>
                            <FormControl>
                                <TextField required value={userName} onChange={(e) => setusername(e.target.value)} id="outlined-required" label="Username" /><br />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={passWord} onChange={(e) => setpassword(e.target.value)}
                                /><br />
                                <TextField required value={email} onChange={(e) => setemail(e.target.value)} id="outlined-required" label="Email" /><br />
                                <TextField required value={phoneNumber} onChange={(e) => setphonenumber(e.target.value)} id="outlined-required" label="Phonenumber" /><br />
                                <Button type="button" onClick={register} variant="contained" color="success" >Register</Button>
                            </FormControl>
                            <br/>
                            <br/>
                            <h6 className="login">
                                Already a User ? <a href="/login">login</a> here
                            </h6>
                        </div>
                    )}
        </>
    )
}

export default RegisterUser;
