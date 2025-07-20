/**
 * @fileoverview Camera Debug Component for Cookie Cutter Monster
 * 
 * This development utility component displays real-time camera position and rotation
 * coordinates for debugging the Three.js 3D scene. It provides visual feedback
 * for camera movement during development and testing.
 * 
 * Features:
 * - Real-time camera position (x, y, z) display
 * - Real-time camera rotation (rx, ry, rz) display
 * - Conditional rendering based on debug flag
 * - Overlay positioning for non-intrusive debugging
 * - Monospace font for consistent numeric display
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

import { LitElement, html, css, property } from "lit-element";
import { CAMERA_DEBUG } from "../constants";

/**
 * Camera debug overlay component for Three.js camera coordinate monitoring
 * 
 * This component serves as a development tool that displays real-time camera
 * position and rotation data in an overlay. It helps developers understand
 * and debug camera movement in the 3D scene.
 * 
 * The component only renders when CAMERA_DEBUG flag is enabled, allowing
 * it to be safely included in production builds without affecting end users.
 */
class CameraDebug extends LitElement {
  /** Camera X position coordinate */
  @property({ type: Number }) x: Number = 0;
  
  /** Camera Y position coordinate */
  @property({ type: Number }) y: Number = 0;
  
  /** Camera Z position coordinate */
  @property({ type: Number }) z: Number = 0;
  
  /** Camera X rotation (pitch) in radians */
  @property({ type: Number }) rx: Number = 0;
  
  /** Camera Y rotation (yaw) in radians */
  @property({ type: Number }) ry: Number = 0;
  
  /** Camera Z rotation (roll) in radians */
  @property({ type: Number }) rz: Number = 0;

  static get styles() {
    return css`
      #camera_debug {
        position: absolute;
        left: 35em;
        top: 10em;
        padding: 1em;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-family: monospace;
      }
    `;
  }

  render() {
    if (!CAMERA_DEBUG) return null;

    return html`
      <div id="camera_debug">
        <div>x:${this.x}</div>
        <div>y:${this.y}</div>
        <div>z:${this.z}</div>
        <div>rx:${this.rx}</div>
        <div>ry:${this.ry}</div>
        <div>rz:${this.rz}</div>
      </div>
    `;
  }
}

customElements.define("camera-debug", CameraDebug);
