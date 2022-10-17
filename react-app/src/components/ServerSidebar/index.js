

import { NavLink } from 'react-router-dom'
import './ServerSidebar.css'

const ServerSidebar = () => {

    const serverImgs = [
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
        'https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png',
    ]

    return (
        <div id='server-sidebar' className='flx-col-algn-ctr'>

            <NavLink to='/channels/@me'>
                <img
                    className='server-sidebar-img'
                    src='https://cdn-icons-png.flaticon.com/512/5968/5968898.png'
                />
            </NavLink>

            {serverImgs.map((serverImg, ind) => {
                return (
                    <img key={ind} className='server-sidebar-img' src={serverImg} />
                )
            })}

        </div>
    )
}

export default ServerSidebar
