import { NavLink } from "react-router-dom"
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div id='splashpage-container' className={`flx-col`}>
            <div id='splash-sect-1' className={`flx-col-justify-algn-ctr pos-rel`}>
                <div className='section-contents'>
                    <nav className='splash-nav flx-row-space-btw pos-abs'>
                        <NavLink className='white-text' to='/'>Discordia Logo</NavLink>

                        <div className='splash-nav-inner-links flx-row-space-evenly'>
                            <NavLink className='white-text' to='/'>Chen, Na</NavLink>
                            <NavLink className='white-text' to='/'>Guo, Yibo</NavLink>
                            <NavLink className='white-text' to='/'>Hang, Justin</NavLink>
                        </div>

                        <NavLink className='white-text' to='/login'>Login</NavLink>
                    </nav>
                    <div className='splash-intro-text'>
                        <h1 className={`white-text`}>IMAGINE A PLACE</h1>
                        <h3 className={`h3-intro-text white-text`}>...where you can belong to a school club, a gaming group, or a worldwide art community.</h3>
                        <h3 className={`h3-intro-text white-text`}>Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-2' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/6IcFryk.png'/>
                    <div className='flx-col section-side-desc'>
                        <h1>Create an invite-only place where you belong</h1>
                        <h3>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-3' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <div className='flx-col section-side-desc'>
                        <h1>Where hanging out is easy</h1>
                        <h3>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</h3>
                    </div>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/P17KqTB.png'/>
                </div>
            </div>

            <div id='splash-sect-4' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/3ktkCJh.png'/>
                    <div className='flx-col section-side-desc'>
                        <h1>From few to a fandom</h1>
                        <h3>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-5' className='flx-col-justify-algn-ctr'>
                <div className='section-contents flx-col-justify-algn-ctr'>
                    <div className='flx-col-justify-algn-ctr ctr-algn-text'>
                        <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
                        <h3>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</h3>
                    </div>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/c80M4cI.png'/>
                </div>
            </div>

        </div>
    )
}

export default SplashPage
