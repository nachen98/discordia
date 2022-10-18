

import { NavLink } from 'react-router-dom'
import './ServerSidebar.css'

const ServerSidebar = () => {

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

                        <NavLink to='/channels/@me'>
                            <img
                                id='dm-server-nav'
                                className='server-sidebar-img'
                                src='https://cdn-icons-png.flaticon.com/512/5968/5968898.png'
                            />
                        </NavLink>

                        <div id='dm-server-divider'></div>

            {serverImgs.map((serverImg, ind) => {
                return (
                    <img key={ind} className='server-sidebar-img' src={serverImg} />
                )
            })}

        </div>
    )
}

export default ServerSidebar
