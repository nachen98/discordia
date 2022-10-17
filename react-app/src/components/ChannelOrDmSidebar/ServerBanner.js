const ServerBanner = ({ serverImg, serverName }) => {
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
