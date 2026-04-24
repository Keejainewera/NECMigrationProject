import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import {
  PlaceholderContent,
  PlaceholderName,
  BaseApplicationCustomizer,
  ApplicationCustomizerContext
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import * as strings from 'NecHeaderApplicationCustomizerStrings';
import GlobalNav from '../../Common/Services/GlobalNav';
import Footer from "../../Common/Services/Footer";
import { setupSP } from './loc/pnpjsConfig';
const LOG_SOURCE: string = 'NecHeaderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INecHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NecHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<INecHeaderApplicationCustomizerProperties> {

  //Variables
  private headerPlaceholder: PlaceholderContent | undefined;
  private footerPlaceholder: PlaceholderContent | undefined;


  public onInit(): Promise<void> {
    setupSP(this.context);
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }
 const css = `
      /* Hide SharePoint text near the waffle icon */
      div[id="O365_SuiteBranding_container"] a[href*="sharepoint.com"] span {
        display: none !important;
      }
    `;

    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);

    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);
    return Promise.resolve();
  }
  private renderPlaceHolders(): void {
    if (!this.headerPlaceholder) {
      //Global Navigation HTMl
      this.headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
      if (!this.headerPlaceholder || !this.headerPlaceholder.domElement) {
        console.error('The expected placeholder (Header) was not found.');
        return;
      }

      const customHtml = `
  <div class="custom-html-content">
    <h1>Custom HTML Title</h1>
    <p>This is custom HTML content added to the placeholder.</p>
  </div>
`;

      // Inject the React component inside the placeholder
      ReactDOM.render(React.createElement(GlobalNav, { context: this.context as ApplicationCustomizerContext }), this.headerPlaceholder.domElement);

      //Footer HTML  
      if (!this.footerPlaceholder) {
        this.footerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
        if (!this.footerPlaceholder || !this.footerPlaceholder.domElement) {
          console.error('The expected placeholder (Footer) was not found.');
          return;
        }

        const commentSection = document.querySelector(".comments-container, .ms-Comment, .Comments, #CommentsWrapper"); // Use actual class from DOM
        if (commentSection && !document.querySelector(".footer-wrapper")) {
          const footerDiv = document.createElement("div");
          footerDiv.setAttribute("id", "footer-root");
          footerDiv.className = "footer-wrapper";

          // Insert the footer after the comment section
          commentSection.parentNode.insertBefore(footerDiv, commentSection.nextSibling);
          ReactDOM.render(React.createElement(Footer, { context: this.context as ApplicationCustomizerContext }), footerDiv);
        } else {
          console.warn("Comment section not found, appending to canvas as fallback.");


          const mainContent = document.querySelector(".SPCanvas-canvas");
          if (mainContent && !document.querySelector(".footer-wrapper")) {
            const footerDiv = document.createElement("div");
            footerDiv.setAttribute("id", "footer-root");
            mainContent.appendChild(footerDiv);
            ReactDOM.render(React.createElement(Footer), footerDiv);
          }
        }
        }
      }
    }
  }