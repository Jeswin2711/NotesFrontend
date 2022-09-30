import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button, FormControl } from "@mui/material";
import axios from "../../api/apis";



const NAME_REGEX = new RegExp(
    '^[A-Z][a-z]{6,}$'
)

const EMAIL_REGEX = new RegExp(
    '^[A-za-z0-9]+([.+-][A-za-z0-9]+)?[@][a-z0-9]+[.][a-z]{2,3}([.][a-z]{2})?$'
)

const PASSWORD_REGEX = new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-])[A-Za-z0-9@$!%*?&]{8,}$'
)

const PHONENUMBER_REGEX  = new RegExp(
    '^([+][0-9]{2})?[\\s]?[1-9][0-9]{9}$'
)



const REGISTER_URL = "/register"

const RegisterUser = () => {
    const [userName, setusername] = useState('')
    const [passWord, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [phoneNumber, setphonenumber] = useState();
    const [success, setsuccess] = useState(false)
    const [errMsg, seterrMsg] = useState(false)
    const [show, setshow] = useState(false)


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
                            <FormControl onClick={() => {setshow(true)}}>
                                {
                                    show ?
                                    NAME_REGEX.test(userName) ? null : 
                                    <p className="err">
                                        Invalid Username
                                    </p> : null
                                }
                                <TextField required value={userName} 
                                    onChange={(e) => {
                                        setusername(e.target.value)
                                    }}
                                    id="outlined-required" label="Username" autoComplete="off"/><br />
                                {
                                    show ?
                                    PASSWORD_REGEX.test(passWord) ? null : 
                                    <p className="err">
                                        Must contain one special character<br/>
                                        one Caps Letter <br/>
                                        one Number <br/>
                                        length b/w 8 to 12
                                    </p> : null
                                }
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password" 
                                    type="password"
                                    autoComplete="current-password"
                                    value={passWord} onChange={(e) => setpassword(e.target.value)}
                                /><br />
                                {
                                    show ?
                                    EMAIL_REGEX.test(email) ? null : 
                                    <p className="err">
                                        Invalid Email
                                    </p> :null
                                }
                                <TextField required value={email} onChange={(e) => setemail(e.target.value)} id="outlined-required" label="Email" autoComplete="off"/><br />
                                {
                                    show ?
                                    PHONENUMBER_REGEX.test(phoneNumber) ? null : 
                                    <p className="err">
                                       Enter Valid Phone Number
                                    </p> : null
                                }
                                <TextField required value={phoneNumber} onChange={(e) => setphonenumber(e.target.value)} id="outlined-required" label="Phonenumber" autoComplete="off"/><br />
                                <Button 
                                    type="button" 
                                    onClick={register} 
                                    variant="contained" 
                                    color="success"
                                    disabled={
                                        NAME_REGEX.test(userName) & 
                                        EMAIL_REGEX.test(email) &
                                        PASSWORD_REGEX.test(passWord) &
                                        PHONENUMBER_REGEX.test(phoneNumber) ? false : true
                                    }
                                >
                                    Register</Button>
                            </FormControl>
                            <br/>
                            <br/>
                            <h6 className="login">
                                Already a User ? <a href="/login">login</a> here
                            </h6>
                        </div>
                    )}
                    {
                        console.log("name"+NAME_REGEX.test(userName))
                    }
        </>
    )
}

export default RegisterUser;
