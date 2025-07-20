import { LitElement, html, css } from 'lit-element';
import { HTMLInputEvent } from "../types"

class ClipartSelector extends LitElement {
  static styles = css`
    container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    #fileSelect {
      width: 100%;
      height: 56px;
      font-size: 1rem;
      font-weight: 500;
      --mdc-theme-primary: var(--primary-brand);
      --mdc-theme-on-primary: white;
    }

    .image-preview {
      margin-top: 1rem;
      text-align: center;
    }

    .image-preview img {
      max-width: 100%;
      max-height: 200px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(139, 69, 19, 0.12);
      object-fit: contain;
    }

    .upload-area {
      border: 2px dashed var(--primary-light);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      background: var(--background-primary);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .upload-area:hover {
      border-color: var(--primary-brand);
      background: #FFF3E0;
    }

    .upload-icon {
      font-size: 3rem;
      color: var(--primary-light);
      margin-bottom: 1rem;
    }
  `;

  handleImageChange(e?: HTMLInputEvent) {
    if (!e || !e.target || !e.target.files) {
      throw Error("image change target is null")
      return null;
    }


    var img = new Image();
    const withExt = e.target.files[0].name
    img.src = URL.createObjectURL(e.target.files[0]);
    const event = new CustomEvent("image-changed", {
      detail: {
        imageSrc: img.src,
        imageHeight: img.height,
        imageWidth: img.width,
        saveFileName: withExt.replace(/\.[^/.]+$/, "")
      }
    })

    img.onload = () => {
      /* we can only get the image dimensions after it's loaded */
      event.detail.imageHeight = img.height;
      event.detail.imageWidth = img.width;

      this.dispatchEvent(event);
      console.log(img, event.detail)
    };
  }

  handleBtnClick() {
    if (!this.shadowRoot) return;

    const inputElem: HTMLInputElement | null = this.shadowRoot.querySelector("#fileInput")
    if (inputElem) {
      inputElem.click();
    }
  }

  render() {
    return html`
    <container>
      <input @change="${this.handleImageChange}" type="file" id="fileInput" name="file" accept="image/*" style="display:none"/>
      
      <div class="upload-area" @click=${this.handleBtnClick}>
        <div class="upload-icon">📁</div>
        <mwc-button
          outlined
          id="fileSelect">
          📷 Choose Image
        </mwc-button>
        <p style="margin: 1rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">
          PNG, JPG, GIF supported • Best with uniform backgrounds
        </p>
      </div>

      <img slot="image" id="imageSrc" crossOrigin="" alt="No Image" style="display:none" hidden=true></img>
    </container>
    `;
  }
}

customElements.define('clipart-selector', ClipartSelector);
