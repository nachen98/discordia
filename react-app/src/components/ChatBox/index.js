
import { useEffect, useState } from 'react'
import UsersListSidebar from '../UsersListSidebar'
import './ChatBox.css'

const ChatBox = () => {
    const [messageInput, setMessageInput] = useState('')

    const listenForEnter = (keydown) => {
        if (keydown.key === 'Enter') {
            keydown.preventDefault();
            let submitBtn = document.getElementById('send-message-btn');
            submitBtn.click();
        }
    }

    useEffect(() => {
        const messageTextField = document.getElementById('send-message-textarea');
        messageTextField.addEventListener('keydown', listenForEnter);

        return () => messageTextField.removeEventListener('keydown', listenForEnter);
    }, [])

    const messages = [
        'hi',
        'bye'
    ]

    const handleMessageInput = e => {
        setMessageInput(e.target.value)
    }

    const handleMessageSubmit = e => {
        e.preventDefault();
        console.log('send message!')
        return;
    }


    return (
        <div id='main-chat' className='flx-row'>
            <div id='chat-nav' className='flx-row-align-ctr'>Channel name and (optional) topic goes here</div>

            <div id='chat-window' className='flx-col'>
                <div id='message-window'>
                    messages go here
                </div>

                <div id='message-input-container' className='flx-col'>
                    <form id='send-message-form' onSubmit={handleMessageSubmit} className='flx-row-justify-ctr'>
                        <textarea
                        className='flx-col'
                        id='send-message-textarea'
                        placeholder={`Message <channel or username(DM) name goes here>`}
                        rows='1'
                        onChange={handleMessageInput}
                        />
                    <button type='submit' id='send-message-btn' style={{display: 'none'}} />
                    </form>
                    <span className='message-char-count'>{255 - messageInput.length}</span>
                </div>
            </div>

            <UsersListSidebar />
        </div>
    )
}

export default ChatBox
