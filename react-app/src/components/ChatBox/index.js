
import UsersListSidebar from '../UsersListSidebar'
import './ChatBox.css'

const ChatBox = () => {
    const messages = [
        'hi',
        'bye'
    ]

    return (
        <div id='main-chat' className='flx-row'>
            <div id='chat-nav' className='flx-row-align-ctr'>stuff goes here</div>

            <div id='chat-window' className='flx-col'>
                <div id='message-window'>
                    messages go here
                </div>

                <div id='message-input-container' className='flx-col'>
                    <form id='send-message-form' className='flx-row-justify-ctr'>
                        <textarea
                        className='flx-col'
                        id='send-message-textarea'
                        placeholder={`Message <channel or username(DM) name goes here>`}
                        rows='1'
                        />
                    </form>
                </div>
            </div>

            <UsersListSidebar />
        </div>
    )
}

export default ChatBox
