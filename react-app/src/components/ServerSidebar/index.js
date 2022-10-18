import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import ServerLogo from './ServerLogo'

import './ServerSidebar.css'

const ServerSidebar = () => {
    const servers = useSelector(state => state.regularServerReducer)
    console.log('servers from the store are ', servers)
    const serversArr = Object.values(servers)

    const pathLocation = useLocation();
    const onDmHomepageBool = pathLocation.pathname === '/channels/@me'
    const dmLogoBackground = onDmHomepageBool ? 'on-dm-homepage-bg' : ''
    console.log(dmLogoBackground)

    const serverImgs = [
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
        'https://m.media-amazon.com/images/I/41kvTKoc38L._AC_SX425_.jpg',
    ]

    return (
        <div id='server-sidebar' className='flx-col-algn-ctr'>

                        <NavLink
                        activeClassName='active-server'
                        className={`server-navlink server-sidebar-img flx-row-justify-align-ctr`}
                        to='/channels/@me'>
                            <img
                                id='dm-server-nav'
                                className={`server-sidebar-img ${dmLogoBackground}`}
                                src='https://i.imgur.com/Pj1HWah.png'
                            />
                        </NavLink>

                        <div id='dm-server-divider'></div>

            {serversArr.map((server) => {
                return (
                    <ServerLogo server={server} key={server.id} />
                )
            })}

        </div>
    )
}

export default ServerSidebar
