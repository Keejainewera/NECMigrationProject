import * as React from 'react';
// import logo from './assets/Logo.png'; // Import logo dynamically

import { useEffect, useState } from 'react'; 
import DataService from './DataService';

import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import '../Css/NEC_Main.css'
import { Constants } from '../Constants/Constants';

interface MenuItem { 
  name: string;
  link: string; 
}

interface SubMenu {
  category: string;
  link: string;
  items: MenuItem[];
}

interface Menu {
  title: string;
  submenu: SubMenu[];
} 
interface IGlobalNavProps {
  context: ApplicationCustomizerContext; // Specify the type of context
}

const GlobalNav: React.FC<IGlobalNavProps> = ({ context }) => {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null); 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };
  const toggleSubmenu = (index: number) => {
    // If the same submenu is clicked, close it; otherwise, open the new one
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };
  const redirectToHomePage = () => { 
    const currentSiteUrl = context.pageContext.web.absoluteUrl;
    const urlParts = currentSiteUrl.split('/sites/'); // Split the URL on '/sites/'
    const HomeUrl = urlParts[0] + "/sites/" + Constants.Intranet_Home;
    const redirectUrl = `${HomeUrl}`; // Adjust to your specific home page
    window.location.href = redirectUrl; // Redirect to the home page of the current site collection
  };
  useEffect(() => {   
        
    const fetchData = async () => {
      const dynamicMenuData = await DataService.fetchMenuData(context); 
      setMenuData(dynamicMenuData);  
    };  
    
    fetchData();
  }, []);
 
 
  return ( 
    <div id="menu-container">
      <div className="menu-wrapper">
        {/* Company Logo */}
        <div className="logo">
          <img onClick={redirectToHomePage} src={require("../images/NECLogoFlag.png")} alt="New Era Logo" className="imglogo" />
        </div>
        <div className="hamburger-menu" onClick={toggleMobileMenu}> 
          <div></div>
          <div></div>
          <div></div>  
        </div> 

        {/* Mobile Menu */}
         
        {isMobileMenuOpen && ( 
          <div className="mobile-menu">
             <div><button className="close-menu" onClick={toggleMobileMenu}>✖</button></div>
            {menuData.map((menuItem, index) => ( 
              <div className="menu-item" key={index} onClick={() => toggleSubmenu(index)}>
                {menuItem.title} ▼
                {menuItem.submenu.length > 0 && openSubmenuIndex === index &&( 
                  <div className="mega-menu">
                    <div className="submenu-columns">
                    {menuItem.submenu.map((submenu: { link: any; category: unknown; items: any[]; }, subIndex: React.Key) => (
                      <div className="submenu-column" key={subIndex}>
                          {submenu.link && submenu.link.Url ? (
                            <a href={submenu.link.Url || "#"} className="submenu-category">
                              <h4>{submenu.category}</h4>
                            </a>  
                          ) : (
                            <h4 className="submenu-category">{submenu.category}</h4>
                          )}
                          {submenu.items.length > 0 && (
                            <ul>
                              {submenu.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  {item.link && item.link.Url ? (
                                    <a href={item.link.Url} className="submenu-item">
                                      {item.name}
                                    </a>
                                  ) : (
                                    <a className="submenu-item">{item.name}</a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div> 
                )}
              </div>
            ))}
          </div>
        )}
 
        {/* Main Navigation */}
        {!isMobileMenuOpen && ( 
        <div className="menu">
          {menuData.map((menuItem, index) => (
            <div className="menu-item" key={index}>
              {/* Main Menu Item */}
              {menuItem.title} ▼
              {/* Mega Menu for Submenu */}
              {menuItem.submenu.length > 0 && (
                <div className="mega-menu">
                  <div className="submenu-columns">
                    {menuItem.submenu.map((submenu: { link: any; category: unknown; items: any[]; }, subIndex: React.Key) => (
                      <div className="submenu-column" key={subIndex}>
                        {/* Submenu Category Link */}
                        {submenu.link && submenu.link.Url ? (
                                  <a href={submenu.link.Url || "#"} className="submenu-category">
                                  <h4>{submenu.category}</h4>
                                </a> 
                                ) : ( 
                                  <h4 className="submenu-category">{submenu.category}</h4>
                                )}
                        {/* Submenu Items with Links */}
                        {submenu.items.length > 0 && (
                          <ul>
                            {submenu.items.map((item, itemIndex) => (
                              <li key={itemIndex}>

                                {item.link && item.link.Url ? (
                                  <a href={item.link.Url} className="submenu-item">
                                    {item.name}
                                  </a>
                                ) : (
                                  <a className="submenu-item">
                                    {item.name}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>)}
      </div>
    </div>
  ); 
};
export default GlobalNav;