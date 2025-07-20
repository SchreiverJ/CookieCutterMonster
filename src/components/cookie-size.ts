/**
 * @fileoverview Cookie Size Selector Component for Cookie Cutter Monster
 * 
 * This component provides an intuitive slider interface for selecting the final
 * size of the cookie cutter. It maps slider positions to both display labels
 * (in inches) and internal values (in millimeters) for proper scaling.
 * 
 * Features:
 * - Visual slider with discrete size options
 * - Dual unit display (inches for users, mm for calculations)
 * - Pre-defined size options optimized for common cookie sizes
 * - Real-time size preview and updates
 * - Responsive grid layout
 * 
 * @author Cookie Cutter Monster Team
 * @version 1.0.0
 * @since 2020-08-01
 */

import { LitElement, html, css } from "lit-element";
import { HTMLInputEvent, CookieState_t } from "../types"

/**
 * Cookie size selector component with slider interface for size selection
 * 
 * This component manages cookie cutter size selection with:
 * - Predefined size options from 2" to 4" (51mm to 101mm)
 * - Slider-based selection for intuitive user experience
 * - Automatic conversion between display units and calculation units
 * - Real-time size updates via custom events
 */
class CookieSize extends LitElement {
  static styles = css`
    container {
      display: grid;
      grid-template-columns: auto auto auto;
      margin-bottom: 1vh;
    }

    container label {
      display: flex;
      align-items: center;
    }

    container output {
      display: flex;
      align-items: center;
    }
  `;

  /** Size values in millimeters corresponding to slider positions */
  values = [51, 64, 76, 89, 101];
  
  /** Display labels in inches for user-friendly size selection */
  labels = [2, 2.5, 3, 3.5, 4];

  /** Current slider position index (default: 2 = 3 inches) */
  currentIndex: number = 2;
  
  /** Current size value in millimeters for calculations */
  currentValue = this.values[this.currentIndex];
  
  /** Current display label in inches for UI */
  currentLabel = this.labels[this.currentIndex];

  /**
   * Handles slider value changes and updates the cookie cutter size
   * 
   * This method processes slider changes by:
   * 1. Validating the input event has a valid target
   * 2. Converting the slider index to the appropriate size values
   * 3. Updating component state for display purposes
   * 4. Dispatching size change event with millimeter value for calculations
   * 5. Triggering component re-render to update display
   * 
   * @param {HTMLInputEvent} e - Slider change event
   * @throws {Error} If the input event or target is invalid
   * @fires cookie-input-changed - Custom event with size update in millimeters
   */
  handleSliderChange(e: HTMLInputEvent) {

    if (!e || !e.target) {
      throw Error("error with size input")
    }

    this.currentIndex = Number(e.target.value);
    this.currentValue = this.values[Number(e.target.value)];
    this.currentLabel = this.labels[Number(e.target.value)];

    const event = new CustomEvent("cookie-input-changed", {
      detail: <CookieState_t>{
        size: Number(this.currentValue)
      }
    })

    this.requestUpdate();
    this.dispatchEvent(event);
  }

  render() {
    return html`
    <container>
      <label for="cookieCutterSize">
        Size
      </label>
      <mwc-slider
        @change=${this.handleSliderChange}
        class="range blue" 
        type="range" 
        min="${0}" 
        value="${this.currentIndex}" 
        max="${this.values.length - 1}" 
        step="1" 
        list="ticks">
      </mwc-slider>

      <datalist id="ticks">
          <option>2</option>
          <option>2.5</option>
          <option>3</option>
          <option>3.5</option>
          <option>4</option>
      </datalist>

      <output id="rangevalue"> ${this.currentLabel} in</output>
    </container>
    `;
  }
}

customElements.define("cookie-size", CookieSize);
