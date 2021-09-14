import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import MoodIcon from '@material-ui/icons/Mood';
import MicIcon from '@material-ui/icons/Mic';
import { useRef, useState } from 'react';
import firebase from '@firebase/app-compat';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

function ChatScreen({chat, messages}) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const endOfMessageRef = useRef();
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection('messages')
      .orderBy("timestamp", "asc")
  );  
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)));

  
  
  const showMessages = () => {
    if(messagesSnapshot) {

      return messagesSnapshot.docs.map(message => (
        <Message 
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <Message 
          key={message.id}
          user={message.user}
          message={message}
        />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('users').doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

    }, {merge: true});

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    })

    setInput('');
    scrollToBottom();
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>

      <Header>
        {
          recipient ? (
            <Avatar src={recipient?.photoURL}/>
          ) : (
            <Avatar>{recipientEmail[0]}</Avatar>
          )
        }
        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          {
            recipientSnapshot ? (
              <p>Last active: {' '}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                ) : "Unavailable"}
              </p>
            ) : (
              <p>Loading Last active...</p>
            )
          }
        </HeaderInfo>
        <HeaderIcons>
          <IconButton><AttachFileIcon /></IconButton>
          <IconButton><MoreVertIcon /></IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef}/>
      </MessageContainer>
      <InputContainer onSubmit={sendMessage}>
        <MoodIcon/>
        <Input 
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <MicIcon />
        <button hidden disabled={!input} type='submit'>Send Message</button>
      </InputContainer>
    </Container>
  )
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.header`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  height: 80px;
  align-items: center;
  padding: 11px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  h3 {
    margin-bottom: 3px;
  }

  p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  background-color: #e5ded8;
  min-height: 90vh;
  padding: 30px;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  z-index: 100;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  align-items: center;
  border: none;
  outline: none;
  background-color: whitesmoke;
  border-radius: 6px;
  margin: 0 15px;
`;