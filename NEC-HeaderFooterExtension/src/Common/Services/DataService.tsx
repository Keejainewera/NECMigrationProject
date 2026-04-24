//import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi } from "@pnp/sp/presets/all";
import { ISPFXContext, SPFx } from "@pnp/sp"; 
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/content-types/list";
import "@pnp/sp/search";

import { ICurrentLogInInfo } from '../../Common/Modal/ICurrentLogInInfo';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { Constants } from "../Constants/Constants";

export class CurrentLoginInfo implements ICurrentLogInInfo {
    public ID: number;
    public IsAdmin: boolean;
    public UserEmail: any;
    public UserDisplayName: string;
}
 
export default class DataService { 
    public static async fetchMenuData(context: ApplicationCustomizerContext): Promise<any> {
      
        try {  
            const listTitle = Constants.List_Navigation;
            const currentSiteUrl = context.pageContext.web.absoluteUrl;
            const urlParts = currentSiteUrl.split('/sites/'); // Split the URL on '/sites/'
            const baseUrl = urlParts[0];
            const sp = spfi(baseUrl).using(SPFx(context)); 
            // Fetch items from the 'NavigationMenu' list using PnPjs
            const items = await sp.web.lists.getByTitle(listTitle).items
                .select('ID', 'Title', 'Category', 'ParentID/ID', 'ItemName', 'URL', 'MenuType,Order0')
                .expand('ParentID')
                // .orderBy('Order')
                .top(5000)();
           
              const dynamicMenuData = this.processMenuData(items);
            console.log(dynamicMenuData);

            return dynamicMenuData; 
        } catch (error) {
            console.error('Error fetching menu data:', error);
            return [];
        }
    }

    // Function to process menu data (this was your original logic)
    private static processMenuData(menuItems: any[]): any[] {
        const menuStructure: any[] = [];

        // Get main menus
        const mainMenus = menuItems.filter(item => item.MenuType === "MainMenu")
        .sort((a, b) => a.Order0 - b.Order0);

        mainMenus.forEach(menu => {
            const submenus = menuItems.filter(sub => sub.MenuType === "SubMenu" 
                && sub.Title === menu.Title)
                .sort((a, b) => a.Order0 - b.Order0);

            const submenuData = submenus.map(sub => ({
                category: sub.Category,
                link: sub.URL,
                items: menuItems
                    .filter( 
                        item => item.MenuType === "Item"
                        &&  item.ParentID.ID === sub.ID
                        
                    ).sort((a, b) => a.Order0 - b.Order0)
                    .map(item => (
                        { name: item.ItemName, 
                            link: item.URL 
                        }))
            }));

            menuStructure.push({
                title: menu.Title,
                submenu: submenuData
            });
        });

        return menuStructure;
    }
}