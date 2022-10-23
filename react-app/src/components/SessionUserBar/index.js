
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

import './SessionUserBar.css'

const COLORS = ['gray', 'purple', 'red', 'yellow', 'green'];

const SessionUserBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const colorInd = sessionUser.id % COLORS.length;
    const bgColor = COLORS[colorInd];

    const handleLogOut = async () => {
        await dispatch(logout()).then(() => history.push('/'))
    }

    return (
        <div id='session-user-bar' className='flx-row-space-btw'>


            <div className='flx-row-justify-align-ctr'>
                <div id='session-user-bar-profile-img-container' className={`${bgColor}-bg flx-row-justify-align-ctr`}>
                    <img
                    id='session-user-bar-profile-img'
                    src='/assets/discordia-mascot.png'
                    alt='profile-img' />

                </div>
                <span>{sessionUser.username}</span>
            </div>

            <button id='logout' onClick={handleLogOut}>
                Log Out
            </button>

        </div>
    )
}

export default SessionUserBar
