/**
 * @fileoverview Cookie Cutter Configuration Component for Cookie Cutter Monster
 * 
 * This component provides a comprehensive settings interface for configuring
 * cookie cutter generation parameters. Users can adjust physical properties
 * like wall thickness and depth, as well as output quality settings.
 * 
 * Features:
 * - Wall thickness selection for different 3D printing capabilities
 * - Cutter depth configuration for various dough thicknesses
 * - Model quality settings balancing file size vs. detail
 * - Responsive grid layout for mobile devices
 * - Real-time parameter updates via custom events
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

import { CookieState_t, HTMLInputEvent } from "../types";
import { LitElement, html, css } from "lit-element";

/**
 * Enumeration of different setting change types for type-safe event handling
 */
enum ChangeType {
  THICKNESS,
  DEPTH,
  FILE_SIZE,
  IS_BEVELED,
  HAS_ROUND_EDGES
}

/**
 * Cookie cutter configuration component with settings for physical and quality parameters
 * 
 * This component manages user input for cookie cutter generation settings:
 * - Physical dimensions (thickness, depth)
 * - Quality/tolerance settings for 3D printing optimization
 * - Event-driven updates to maintain loose coupling with parent components
 */
class CookieInputs extends LitElement {
  static styles = css`
    container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    select-container {
      position: relative;
    }

    mwc-select {
      width: 100%;
      --mdc-theme-primary: var(--primary-brand);
      --mdc-select-fill-color: var(--background-secondary);
      --mdc-select-ink-color: var(--text-primary);
      --mdc-select-label-ink-color: var(--text-secondary);
      --mdc-select-outlined-idle-border-color: var(--primary-light);
      --mdc-select-outlined-hover-border-color: var(--primary-brand);
      font-size: 1rem;
    }

    .section-title {
      font-weight: 600;
      color: var(--primary-brand);
      margin-bottom: 1rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 768px) {
      .settings-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  /**
   * Dispatches configuration changes to parent components via custom events
   * 
   * This method creates a standardized event for communicating setting changes
   * up the component tree. It maintains loose coupling by using the event system
   * rather than direct parent references.
   * 
   * @param {CookieState_t} eventDetail - Partial state object containing changed settings
   * @fires cookie-input-changed - Custom event with configuration updates
   */
  eventToParent(eventDetail: CookieState_t) {
    const event = new CustomEvent("cookie-input-changed", {
      detail: eventDetail
    })

    this.dispatchEvent(event)
  }

  /**
   * Handles user input changes and updates the appropriate cookie cutter setting
   * 
   * This method processes different types of setting changes using a switch statement
   * based on the ChangeType enum. It:
   * 1. Validates the input event has a valid target
   * 2. Creates a partial state update object
   * 3. Updates the appropriate property based on change type
   * 4. Converts values to correct types (Number for dimensions, Boolean for flags)
   * 5. Dispatches the update to parent components
   * 
   * @param {HTMLInputEvent} e - Input change event from form controls
   * @param {ChangeType} changeType - Type of setting being changed (thickness, depth, etc.)
   * @throws {Error} If the input event or target is invalid
   */
  handleChange(e: HTMLInputEvent, changeType: ChangeType) {
    if (!e || !e.target) {
      throw Error("error with thickness input")
    }
    const stateUpdate: CookieState_t = <CookieState_t>{};

    switch (changeType) {
      case ChangeType.THICKNESS:
        stateUpdate.thickness = Number(e.target.value);
        break;
      case ChangeType.DEPTH:
        stateUpdate.depth = Number(e.target.value);
        break;
      case ChangeType.FILE_SIZE:
        stateUpdate.tolerance = Number(e.target.value);
        break;
      case ChangeType.IS_BEVELED:
        stateUpdate.cutterBevel = Boolean(e.target.checked);
        break;
      case ChangeType.HAS_ROUND_EDGES:
        stateUpdate.handleRound = Boolean(e.target.checked);
        break;
    }

    this.eventToParent(stateUpdate);
  }

  render() {
    return html`
    <container>
      <div class="section-title">
        ⚙️ Cutter Settings
      </div>
      
      <div class="settings-grid">
        <select-container>
          <mwc-select 
            outlined 
            label="🔧 Wall Thickness"
            @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.THICKNESS)}">
              <mwc-list-item value=".7">Extra Thin (.7mm)</mwc-list-item>
              <mwc-list-item value="1" selected="selected">Thin (1mm) ⭐</mwc-list-item>
              <mwc-list-item value="1.3">Medium (1.3mm)</mwc-list-item>
              <mwc-list-item value="1.6">Thick (1.6mm)</mwc-list-item>
              <mwc-list-item value="2">Very Thick (2mm)</mwc-list-item>
          </mwc-select>
        </select-container>

        <select-container>
          <mwc-select 
            outlined 
            label="📏 Cutter Depth"
            @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.DEPTH)}">
              <mwc-list-item value="12">Shallow (12mm)</mwc-list-item>
              <mwc-list-item value="16" selected="selected">Standard (16mm) ⭐</mwc-list-item>
              <mwc-list-item value="20">Deep (20mm)</mwc-list-item>
          </mwc-select>
        </select-container>
      </div>

      <select-container>
        <mwc-select 
          outlined 
          label="💾 Model Quality"
          @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.FILE_SIZE)}">
            <mwc-list-item value=".01">🔥 Ultra High (Larger file)</mwc-list-item>
            <mwc-list-item value=".15" selected="selected">✨ High Quality ⭐</mwc-list-item>
            <mwc-list-item value=".3">⚡ Medium (Balanced)</mwc-list-item>
            <mwc-list-item value=".7">🚀 Fast (Smaller file)</mwc-list-item>
            <mwc-list-item value="2">⚡ Lightning Fast</mwc-list-item>
        </mwc-select>
      </select-container>

    </container>
    `;
  }
}

customElements.define("cookie-inputs", CookieInputs);
