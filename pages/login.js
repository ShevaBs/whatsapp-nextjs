import Head from 'next/head';
import { Button } from '@material-ui/core';
import styled from "styled-components";
import { auth, provider } from '../firebase';

function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>

      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"/>
        <Button 
          variant="outlined"
          onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginContainer> 

    </Container>
  )
}

export default Login;

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vw;
  place-items: center ;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 8px 5px whitesmoke,
  0 0 6px 3px whitesmoke;
`;

const Logo = styled.img`
  height: 200px;
  object-fit: contain;
  margin-bottom: 50px;
`;