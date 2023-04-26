import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-overlay",
  template: `
    <div class="overlay-container" [ngClass]="cssClass" [ngStyle]="cssStyles">
      <div class="spinner-overlay">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay-container {
        z-index: 999;
      }
      .overlay-container.app-level {
        position: absolute;
        top: 0;
      }
      .overlay-container.app-level {
        width: var(--overlay-spinner-width, 100vw);
        height: var(--overlay-spinner-height, 100vh);
      }
      .spinner-overlay {
        width: 100%;
        height: 100%;
        background: var(--overlay-spinner-bg-color, rgba(255, 255, 255, 0.5));
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class OverlayComponent {
  /**
   * @attr app-level
   */
  @Input("app-level") appLevel!: boolean;
  /**
   * @attr width
   */
  @Input() width!: string;
  /**
   * @attr height
   */
  @Input() height!: string;
  /**
   * @attr position
   */
  @Input() position!: string;

  get cssClass() {
    return {
      ["app-level"]: Boolean(this.appLevel),
    };
  }

  get cssStyles() {
    return {
      ["height"]: this.height ?? "100%",
      ["width"]: this.width ?? "100%",
      ["position"]: this.position ?? undefined,
    };
  }
}
