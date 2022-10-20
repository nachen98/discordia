const ServerBanner = ({ isDm, serverImg, serverName }) => {

    if (!serverImg) {
        return (
            <div id='server-text-only-title' className={`white-text flx-row-space-btw server-title ${isDm ? '' : 'server-title-container'}`}>
                {serverName}
            </div>
        )
    }

    return (
        <>
            <div id='server-banner-container' className='pos-rel'>
                <img id='server-banner-img' src={serverImg} />

                <div className='pos-abs white-text server-name-offset flx-row-space-btw server-title-container'>
                    <span>{serverName}</span>
                    <span>setting button</span>
                </div>
            </div>
        </>
    )
}

export default ServerBanner
