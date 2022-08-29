import { useState } from "react";
import axios from "axios";
import { useNavigatem } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { TextField, Button, Box } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import "../css/login.css"
function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [warning, setWarning] = useState("")
    useEffect(() => {
        if (Cookies.get('token') != "undefined") {
            //alert()
            axios.post('http://localhost:8080/api/v1/login', null, { params: { token: Cookies.get('token') } })
                .then(res => {
                    window.location.href = "/home"
                },
                    error => {
                        alert(error);
                    })
        }


        //alert(res.name)
    }, []);
    function login() {

        axios.post('http://localhost:8080/api/v1/login', null, { params: { username: username, password: password } })
            .then(res => {
                Cookies.set("token", res.data)
                window.location.href = "/home"
            },
                error => {
                    setWarning("Đăng nhập thất bại !")
                    alert(error);
                })
        // do something here
    }
    const inputUsername = event => {
        setUsername(event.target.value)
    }
    const inputPassword = event => {
        setPassword(event.target.value)
    }
    return (

        <div className="login-component">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-2 p-3 rounded login-container">
                    <div className="d-flex justify-content-center mb-2"><LockIcon fontSize="large" /></div>
                    <TextField sx={{
                        width: 500,
                        maxWidth: '100%'
                    }} label="Tên đăng nhập" className="mb-3" variant="filled" color="success" focused value={username} onChange={inputUsername} />
                    <TextField sx={{
                        width: 500,
                        maxWidth: '100%'
                    }} label="Mật khẩu" className="mb-3" variant="filled" color="success" focused value={password} onChange={inputPassword} />
                    <div className="text-danger font-weight-bold mb-2">{warning}</div>
                    <Button onClick={login} variant="contained" color="success">
                        Đăng nhập
                    </Button>
                </div>

            </div>

        </div>
    )

}
export default Login;