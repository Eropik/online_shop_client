import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Card, Container, Form, Row,} from "react-bootstrap";
import {NavLink, useLocation, } from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE,} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";



const Auth = observer(() => {
    const {user} = useContext(Context)

    const location = useLocation();
    const isLogin=location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const navigate= useNavigate();

    const clearFolders = () => {
        setEmail('');
        setPassword('');
        setRePassword('')
    }

    const click = async () =>{
     let data
     try{
         if (isLogin){
             data = await login(email, password);
             user.setUser(data)
             user.setIsAuth(true)   
            navigate(SHOP_ROUTE)
            
         }
         else {
             data = await registration(email,password,rePassword);
            clearFolders()
              navigate(LOGIN_ROUTE)
         }


     }
     catch(e) {
         alert(e.response.data.message)
     }
    }



    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}>

            <Card style ={{width: 600}} className="p-5">
            <h2 className="m-auto">
                {isLogin ? 'Authorization':'Registration' }</h2>
                <Form className="d-flex flex-column align-items-center" >
                    {isLogin?
                        <Container>
                        <Form.Control
                        className="mt-2"
                        placeholder="Enter email"

                        value={email}
                        onChange={e=>setEmail(e.target.value)}

                        />
                        <Form.Control
                        className="mt-2"
                        placeholder="Enter password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password"/>
                        </Container>
                        :
                        <Container>
                            <Form.Control
                                className="mt-2"
                                placeholder="Enter email"

                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Enter password"

                                value={password}
                                onChange={e=>setPassword(e.target.value)}

                                type="password"/>
                            <Form.Control
                                className="mt-2"
                                placeholder="Repeat password"
                                value={rePassword}
                                onChange={e=>setRePassword(e.target.value)}
                                type="password"/>

                        </Container>

                    }

                    <Container>

                        {isLogin?
                            <Row className="mt-2">
                                <ButtonGroup  className="auth_reg_btngroup">
                                    <Button  variant={"outline-dark"}>
                                        <NavLink className={"nav-link"} to={REGISTRATION_ROUTE}>
                                            Registration
                                        </NavLink>
                                    </Button>

                                    <Button  variant={"outline-dark"} onClick={click}>

                                         <NavLink className={"nav-link"} to={LOGIN_ROUTE} >
                                            Log in
                                        </NavLink>
                                    </Button>
                                </ButtonGroup>
                            </Row>
                            :
                            <Row className="mt-2">
                            <ButtonGroup className="auth_reg_btngroup">
                                <Button  variant={"outline-dark"}>
                                    <NavLink className={"nav-link"} to={LOGIN_ROUTE}>
                                        Authorization
                                    </NavLink>
                                </Button>

                                <Button  variant={"outline-dark"} onClick={click}>

                                    <NavLink className={"nav-link"} >
                                        Registration
                                    </NavLink>
                                </Button>
                            </ButtonGroup>
                            </Row>
                        }
                    </Container>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;