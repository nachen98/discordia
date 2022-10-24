import { Link, NavLink } from "react-router-dom"
import { onErrorLoadDiscLogoHandler } from "../../utils/helper"
import './SplashPage.css'
import discordiaLogo from '../../img/discordia.png'
import splash2 from '../../img/splash-sect-2.png'
import splash3 from '../../img/splash-sect-3.png'
import splash4 from '../../img/splash-sect-4.png'
import splash5 from '../../img/splash-sect-5.png'

const SplashPage = () => {
    return (
        <div id='splashpage-container' className={`flx-col`}>

            <div id='splash-sect-1' className={`flx-col-justify-align-ctr pos-rel`}>
                <div className='section-contents'>
                    <nav className='splash-nav flx-row-space-btw pos-abs'>
                        <NavLink className='white-text flx-row-justify-align-ctr' to='/'>
                            <img onError={onErrorLoadDiscLogoHandler} src={discordiaLogo} alt='home-logo' id="home-logo"/>
                            Discordia
                        </NavLink>

                        <div className='splash-nav-inner-links flx-row-justify-align-ctr flx-row-space-evenly'>
                            <a className='white-text ctr-algn-text' href='https://github.com/nachen98'>Chen, Na</a>
                            <a className='white-text ctr-algn-text' href='https://github.com/GUOYIBO'>Guo, Yibo</a>
                            <a className='white-text ctr-algn-text' href='https://github.com/juanpunchman'>Hang, Justin</a>
                        </div>

                        <NavLink className="flx-row-justify-align-ctr" to={"/login"}>
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
                    <img onError={onErrorLoadDiscLogoHandler} className='splash-sect-imgs' src={splash2} alt='splash-section'/>
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
                    <img onError={onErrorLoadDiscLogoHandler} className='splash-sect-imgs' src={splash3} alt='splash-section'/>
                </div>
            </div>

            <div id='splash-sect-4' className='flx-row-justify-align-ctr'>
                <div className='section-contents flx-row-justify-align-ctr'>
                    <img onError={onErrorLoadDiscLogoHandler} className='splash-sect-imgs' src={splash4} alt='splash-section'/>
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
                    <img onError={onErrorLoadDiscLogoHandler} className='splash-sect-imgs' src={splash5} alt='splash-section'/>
                </div>
            </div>

            <div id='splash-sect-6'>
                <div id='splash-sect-6-inner-container' className="flx-row-space-btw flx-row-justify-align-ctr">
                        <NavLink className='white-text flx-row-justify-align-ctr' to='/'>
                            <img onError={onErrorLoadDiscLogoHandler} src={discordiaLogo} alt='home-logo' id="home-logo"/>
                            Discordia
                        </NavLink>
                        <NavLink to={"/sign-up"}>
                        <button id="splash-signup-button" >Sign up</button>
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default SplashPage
