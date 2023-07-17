import { InjectionToken } from '@angular/core';

export interface SlideContentDataLoader {
  /**
   * Load the slides in cache
   */
  load(): Promise<boolean>;

  /**
   * @var SlidesContents
   */
  contents: SlidesContents;
}

export interface SlideContentBuilder {
  /**
   * Build the slide content
   *
   * @param data
   */
  build(data: string | SlideData): string;
}

export interface SlideData {
  /**
   * Returns the string representation of the slide data
   */
  toString(): string;
}

export interface SlidesContents {
  timer: number;
  slides: { data: string }[];
}

export const SLIDE_CONTENT_HANDLER = new InjectionToken<
  SlideContentDataLoader & SlideContentBuilder
>('Load slides contents');
