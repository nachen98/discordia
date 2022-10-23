import { NavLink, useParams } from "react-router-dom"

const ServerLogo = ({ server }) => {
    const { serverId } = useParams();
    const onServer = parseInt(serverId) === server.id
    const serverLogoBG = onServer ? 'active-server-sidebar-img' : ''

    // NOTE: EDGECASE WHERE THERE IS A SERVER WITH NO CHANNELS!
    let navlinkPath = `/channels/${server.id}`
    if (server.channels?.length > 0)  navlinkPath = navlinkPath + `/${server.channels[0]}`

    if (!server.image_url) {
        let serverInitials;
        const serverNamePartition = server.name.split('-').filter(part => part !== '')

        if (serverNamePartition.length === 1) serverInitials = server.name.slice(0, 3)
        else serverInitials = serverNamePartition.map(word => word[0]).join('-')

        return (
            <NavLink
            activeClassName='active-server'
            className={`server-navlink`}
            to={`${navlinkPath}`}>
                <div className={`${serverLogoBG} default-server-text-logo flx-row-justify-align-ctr`}>
                    <div className={`text-logo flx-row-justify-align-ctr`}>
                        {serverInitials.slice(0,3).trimRight()}
                    </div>
                </div>
            </NavLink>
        )
    }

    return (
        <NavLink
        activeClassName='active-server'
        className={`server-navlink`}
        to={`${navlinkPath}`}>
            <div className={`${serverLogoBG} server-sidebar-logo-container flx-row-justify-align-ctr`}>
                <img className={`server-sidebar-logo`} src={server.image_url} alt='server-logo'/>
            </div>
        </NavLink>
    )
}

export default ServerLogo
