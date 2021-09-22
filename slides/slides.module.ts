import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import {
  SlideContentDataLoader,
  SLIDE_CONTENT_HANDLER,
} from "./slide-content-loader";
import { SlidesComponent } from "./slides.component";

@NgModule({
  imports: [HttpClientModule, CommonModule, ClarityModule],
  declarations: [SlidesComponent],
  exports: [SlidesComponent],
})
export class SlidesModule {
  static forRoot(): ModuleWithProviders<SlidesModule> {
    return {
      ngModule: SlidesModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: (slidesContentLoader: SlideContentDataLoader) => {
            return async () => {
              return await slidesContentLoader.load();
            };
          },
          deps: [SLIDE_CONTENT_HANDLER],
        },
      ],
    };
  }
}
