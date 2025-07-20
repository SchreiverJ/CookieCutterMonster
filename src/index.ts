/**
 * @fileoverview Main application entry point for Cookie Cutter Monster
 * 
 * This file contains the root application component that orchestrates the cookie cutter
 * generation process. It handles OpenCV.js loading, user input events, and coordinates
 * between the UI components and image processing services.
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

import "./registerComponents";
import loadCV from "./scriptLoader";

import { LitElement, html } from "lit-element";

import CookieState from "./services/cookieState";
import { CookieState_t } from "./types";
import processImage from "./services/imageProcessing";

/**
 * Interface for input change events that carry cookie cutter configuration data
 */
interface InputChangedEvent extends Event {
    detail: CookieState_t
}

/**
 * Main application component for Cookie Cutter Monster
 * 
 * This LitElement component serves as the root of the application, managing the lifecycle
 * of OpenCV.js loading, handling user interactions, and coordinating the image processing
 * workflow to generate 3D cookie cutter models.
 */
class CookieCutterApp extends LitElement {
    
    /** OpenCV.js instance, loaded asynchronously */
    cv = null;

    /**
     * Removes the shadow DOM for this element to allow direct DOM queries
     * 
     * This is necessary because OpenCV.js uses document.querySelector() calls
     * that need access to the main document DOM rather than shadow DOM.
     * 
     * @returns {HTMLElement} The component itself (no shadow root)
     */
    createRenderRoot() {
        return this;
    }

    /**
     * Callback function for when OpenCV.js library is successfully loaded
     * 
     * @param {any} cv - The OpenCV.js module instance
     * @throws {Error} If the OpenCV library couldn't be loaded
     */
    getCV(cv: any) {
        if (!cv) {
            throw Error("couldn't load the opencv library")
        }

        this.cv = cv;
        this.requestUpdate();
    }

    /**
     * LitElement lifecycle method called after first render
     * Initiates the OpenCV.js loading process
     */
    firstUpdated() {
        loadCV(this.getCV.bind(this))
    }

    /**
     * Handles input changes from UI components and triggers image processing
     * 
     * This method is called whenever the user uploads a new image or changes
     * cookie cutter parameters. It updates the global state and initiates
     * the image processing pipeline.
     * 
     * @param {InputChangedEvent} event - Event containing updated cookie state
     */
    handleInputChange(event: InputChangedEvent) {
        CookieState.update(event.detail);

        const canvasElement = document.getElementById('canvasOutput');
        const imageSrcElement: any = document.querySelector("#imageSrc");
        if (!event.detail.imageSrc || !canvasElement || !imageSrcElement) return;

        imageSrcElement.src = event.detail.imageSrc;
        imageSrcElement.height = event.detail.imageHeight;
        imageSrcElement.width = event.detail.imageWidth;

        console.log(imageSrcElement)

        processImage(
            this.cv,
            imageSrcElement,
            canvasElement,
            event.detail.saveFileName);
    }

    render() {
        /* don't load unless we pulled opencv in */
        if (!this.cv) return null;

        return html`
        <camera-debug id="cameraDebug"></camera-debug>
        <mwc-top-app-bar>
            <h2 slot="title">🍪 Cookie Cutter Monster</h2>
            </mwc-top-app-bar>
            
        <grid-container>
            <input-container>
                <h3 style="margin: 0 0 1rem 0; color: var(--primary-brand); font-family: var(--font-family-display);">Create Your Cookie Cutter</h3>
                <p>Upload an image with a clear subject and uniform background to create your own custom 3D printable cookie cutter</p>
                <clipart-selector @image-changed="${this.handleInputChange}">
                    <img name="image" id="imageSrc" />
                </clipart-selector>
                <cookie-size @cookie-input-changed=${this.handleInputChange}></cookie-size>
                <cookie-inputs @cookie-input-changed=${this.handleInputChange} id="cookie-inputs"></cookie-inputs>
                <download-btn-container>
                    <mwc-button raised type="submit" id="exportASCII" class="btn btn-primary">
                        📥 Download STL File
                    </mwc-button>
                    <p style="text-align: center; margin: 0.5rem 0 0 0; color: var(--text-muted); font-size: 0.9rem;">
                        Ready for 3D printing with PLA, PETG, or ABS
                    </p>
                </download-btn-container>
            </input-container>

            <canvas-container>
                <h3 style="margin: 0 0 1rem 0; color: var(--primary-brand); font-family: var(--font-family-display);">🔍 Preview & Results</h3>
                
                <div style="display: grid; gap: 1.5rem;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 1rem;">Edge Detection</h4>
                        <canvas id="canvasOutput"></canvas>
                    </div>
                    
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 1rem;">3D Model Preview</h4>
                        <div id="threeoutput">
                            <div style="text-align: center; color: var(--text-muted);">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🍪</div>
                                <p>Your 3D cookie cutter will appear here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </canvas-container>

        </grid-container>
        `;
    }
}

customElements.define("cookie-cutter-app", CookieCutterApp);

/**
 * Mount the app into the DOM
 */
const mountPoint = document.getElementById("cookie-cutter-app")

if (!mountPoint) {
    throw Error("whoa, there's no html element with the cookie-cutter-app id. App not able to mount")
} else {
    mountPoint.appendChild(document.createElement("cookie-cutter-app"));
}