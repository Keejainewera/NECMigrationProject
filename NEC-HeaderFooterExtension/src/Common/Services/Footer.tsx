import * as React from 'react';
import '../Css/NEC_FooterMain.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import FollowStar from './FollowStar';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
interface IGlobalNavProps1 {
    context: ApplicationCustomizerContext; // Specify the type of context
}
const Footer: React.FC<IGlobalNavProps1> = (context) => {
    return (
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footerlogo">
                        <img src={require("../images/NECLogoInline.png")} alt="New Era Logo" className='imglogo' />
                        <div className="social-icons" style={{ float: "right" }}>
                            <a target='_blank' href="https://www.facebook.com/neweracap" className="icon"><i className="fab fa-facebook"></i></a>
                            <a target='_blank' href="https://www.instagram.com/neweracap" className="icon"><i className="fab fa-instagram"></i></a>
                            <a target='_blank' href="https://twitter.com/neweracap" className="icon"><i className="fab fa-x-twitter"></i></a>
                            <a target='_blank' href="https://www.tiktok.com/@neweracap" className="icon"><i className="fab fa-tiktok"></i></a>
                            <a target='_blank' href="https://www.pinterest.com/neweracap/" className="icon"><i className="fab fa-pinterest"></i></a>
                            <a target='_blank' href="https://www.youtube.com/c/newera" className="icon"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="copyright">© 2025 New Era Cap</div>
                    {/* Legal Text + FollowStar inline */}
                    <div className="legal-follow-row">
                        <p className="legal-text">
                           <p>All rights reserved. Product name, logos, visor stickers are New Era Trademarks. </p> 
                            <p>All other marks are trademarks for their owners. Nothing on this site may be copied without written permission.</p>
                        </p>
                        <FollowStar siteUrl={context.context.pageContext.web.absoluteUrl} />
                    </div>
                    
                    <div className="links">
                        <a href="#">🇺🇸 USA ▼</a> |
                        <a href="#"> Sitemaps</a> |
                        <a href="#"> Privacy</a> |
                        <a href="#"> Terms</a> |
                        <a href="#"> Supply Chain Transparency</a> |
                        <a href="#"> Your Privacy Choices</a> |
                        <a href="#"> Cookie Preferences</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;