import React, { useContext } from 'react'
import '../style.scss';
import { BsCameraFill } from 'react-icons/bs';
import { IoIosMore } from 'react-icons/io'
import { IoPersonAddSharp } from 'react-icons/io5';
import Messages from './Messages';
import InputPanel from './InputPanel';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsCameraFill size={25} color='white'></BsCameraFill>
          <IoPersonAddSharp size={25} color='white'></IoPersonAddSharp>
          <IoIosMore size={25} color='white'></IoIosMore>
        </div>
      </div>
      <Messages />
      <InputPanel />
    </div>
  )
}

export default Chat