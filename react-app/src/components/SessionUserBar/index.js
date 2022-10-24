
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

import './SessionUserBar.css'
import userDiscImg from '../../img/discordia-mascot.png'
import { onErrorLoadDiscLogoHandler } from '../../utils/helper';

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
                    <img onError={onErrorLoadDiscLogoHandler}
                    id='session-user-bar-profile-img'
                    src={userDiscImg}
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
