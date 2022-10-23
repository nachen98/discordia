import { Link, NavLink } from "react-router-dom"
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div id='splashpage-container' className={`flx-col`}>

            <div id='splash-sect-1' className={`flx-col-justify-align-ctr pos-rel`}>
                <div className='section-contents'>
                    <nav className='splash-nav flx-row-space-btw pos-abs'>
                        <NavLink className='white-text' to='/'>Discordia Logo</NavLink>

                        <div className='splash-nav-inner-links flx-row-space-evenly'>
                            <a className='white-text' href='https://github.com/nachen98'>Chen, Na</a>
                            <a className='white-text' href='https://github.com/GUOYIBO'>Guo, Yibo</a>
                            <a className='white-text' href='https://github.com/juanpunchman'>Hang, Justin</a>
                        </div>

                        <NavLink to={"/login"}>
                        <button id="splash-login-button" >Login</button>
                        </NavLink>
                    </nav>
                    <div className='splash-intro-text'>
                        <h1 className={`white-text`}>IMAGINE A PLACE</h1>
                        <h3 className={`h3-intro-text white-text`}>...consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
                        <h3 className={`h3-intro-text white-text`}>Fermentum posuere urna nec tincidunt praesent. Ornare lectus sit amet est placerat in egestas.</h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-2' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/6IcFryk.png' alt='splash-section'/>
                    <div className='flx-col section-side-desc'>
                        {/* <h1>Create an invite-only place where you belong</h1>
                        <h3>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</h3> */}
                        <h1>Lorem ipsum dolor sit amet</h1>
                        <h3>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt praesent. </h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-3' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <div className='flx-col section-side-desc'>
                    <h1>Lorem ipsum dolor sit amet</h1>
                        <h3>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt praesent. </h3>
                    </div>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/P17KqTB.png' alt='splash-section'/>
                </div>
            </div>

            <div id='splash-sect-4' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/3ktkCJh.png' alt='splash-section'/>
                    <div className='flx-col section-side-desc'>
                    <h1>Lorem ipsum dolor sit amet</h1>
                    <h3>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt praesent. </h3>
                    </div>
                </div>
            </div>

            <div id='splash-sect-5' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <div className='flx-row-justify-algn-ctr ctr-align-text'>
                    <h1>Lorem ipsum dolor sit amet</h1>
                        <h3>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt praesent. </h3>
                    </div>
                    <img className='splash-sect-imgs' src='https://i.imgur.com/c80M4cI.png' alt='splash-section'/>
                </div>
            </div>

            <div id='splash-sect-6'>
                <div id='splash-sect-6-inner-container' className="flx-row-space-btw">
                    <div>discordia logo</div>
                    <NavLink to={"/sign-up"}>
                        <button id="splash-signup-button" >Sign up</button>
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default SplashPage
