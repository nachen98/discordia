import { NavLink, useParams } from "react-router-dom"

const ServerLogo = ({ server }) => {
    const { serverId, channelId } = useParams();
    const onServer = parseInt(serverId) === server.id
    const serverLogoBG = onServer ? 'active-server-sidebar-img' : 'server-sidebar-img'

    if (!server.image_url) {
        const serverNamePartition = server.name.split('-')
        const serverInitials = serverNamePartition.map(word => word[0]).join('-')

        return (
            <NavLink
            activeClassName='active-server'
            className={`server-navlink`}
            to={`/channels/${server.id}/1`}>
                <div className={`${serverLogoBG} default-server-text-logo flx-row-justify-align-ctr`}>
                    {serverInitials}
                </div>
            </NavLink>
        )
    }

    return (
        <NavLink
        activeClassName='active-server'
        className={`server-navlink`}
        to={`/channels/${server.id}/1`}>
            <img className={`${serverLogoBG}`} src={server.image_url} />
        </NavLink>
    )
}

export default ServerLogo
