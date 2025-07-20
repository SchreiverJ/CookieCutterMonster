import "./registerComponents";
import loadCV from "./scriptLoader";

import { LitElement, html } from "lit-element";

import CookieState from "./services/cookieState";
import { CookieState_t } from "./types";
import processImage from "./services/imageProcessing";

interface InputChangedEvent extends Event {
    detail: CookieState_t
}

class CookieCutterApp extends LitElement {
    /**
     * createRenderRoot removes the shadow dom for this 
     * element.  Which allows you to querySelect by 
     * using `document.querySelctor(<someQuery>)`
     * 
     * We are doing this because the opencv lib is using 
     * document query selectors
     */
    createRenderRoot() {
        return this;
    }

    /* let's load in opencv so we can access it in this module */
    cv = null;
    getCV(cv: any) {
        if (!cv) {
            throw Error("couldn't load the opencv library")
        }

        this.cv = cv;
        this.requestUpdate();
    }

    firstUpdated() {
        loadCV(this.getCV.bind(this))
    }

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