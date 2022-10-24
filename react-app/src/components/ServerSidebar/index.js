import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import CreateServerModal from '../CreateServerModal'
import ServerLogo from './ServerLogo'

import './ServerSidebar.css'
import userDiscImg from '../../img/discordia-mascot.png'
import { onErrorLoadDiscLogoHandler } from '../../utils/helper'

const ServerSidebar = () => {
    const servers = useSelector(state => state.regularServerReducer)
    console.log('servers from the store are ', servers)
    const serversArr = Object.values(servers)

    const pathLocation = useLocation();
    const onDmHomepageBool = pathLocation.pathname === '/channels/@me'
    const dmLogoBackground = onDmHomepageBool ? 'on-dm-homepage-bg' : ''
    console.log(dmLogoBackground)

    return (
        <div id='server-sidebar' className='flx-col-align-ctr'>

            <NavLink
            activeClassName='active-server'
            className={`server-navlink server-sidebar-img dm-server-nav flx-row-justify-align-ctr flx-shrink-null`}
            to='/channels/@me'>
                <img onError={onErrorLoadDiscLogoHandler}
                    id='dm-server-nav-logo'
                    className={`s${dmLogoBackground}`}
                    src={userDiscImg}
                />
            </NavLink>

            <div className='dm-server-divider flx-shrink-null'></div>

            {serversArr.map((server) => {
                return (
                    <ServerLogo server={server} key={server.id} />
                )
            })}

            <div className='dm-server-divider flx-shrink-null'></div>

            <div id='add-server-logo' className='server-navlink server-sidebar-img flx-row-justify-align-ctr flx-shrink-null'>
                <CreateServerModal />
            </div>

        </div>
    )
}

export default ServerSidebar
