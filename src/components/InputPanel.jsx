import React, { useContext, useState } from 'react'
import { MdSend, MdAttachFile } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';

const InputPanel = () => {
  const [text, setText] = useState("");
  const [img, setImage] = useState(null)

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })

          });

        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    setText("")
    setImage(null)
  }




  return (
    <div className='inputPanel'>

      <input type='text' placeholder='Type your message...' value={text} onChange={(e) => setText(e.target.value)} />
      <div className="send">
        <input type='file' id="file" style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />
        <label htmlFor='file'>
          <MdAttachFile size={25} color="gray"></MdAttachFile>
        </label>
        <MdSend size={25} color="gray" onClick={handleSend}></MdSend>
      </div>

    </div>
  )
}

export default InputPanel