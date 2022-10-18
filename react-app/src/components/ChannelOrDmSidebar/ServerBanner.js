const ServerBanner = ({ serverImg, serverName }) => {
    serverImg = false;
    if (!serverImg) {
        return (
            <div id='server-title' className='white-text flx-row-align-ctr'>
                {serverName}
            </div>
        )
    }

    return (
        <>
            <img id='server-banner-img' className='pos-rel' src={serverImg} />

            <div className='pos-abs white-text'>
                {serverName}
            </div>
        </>
    )
}

export default ServerBanner
