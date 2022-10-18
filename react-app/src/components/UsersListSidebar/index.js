
import './UsersListSidebar.css'

const UsersListSidebar = () => {
    const users = [
        'Na',
        'Yibo',
        'Justin',
        'David'
    ]

    return (
        <div id='users-list-sidebar' className='flx-col-algn-ctr'>
            {users.map((user, ind) => {
                return (
                    <div key={ind} className='user-card flx-row-align-ctr'>
                        {user}
                    </div>
                )
            })}
        </div>
    )
}

export default UsersListSidebar
