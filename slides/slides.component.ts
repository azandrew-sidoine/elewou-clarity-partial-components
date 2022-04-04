import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, OnDestroy, Inject, Input } from "@angular/core";
import { interval, Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { createSlide } from "./helpers";
import { Slide } from "./models/slide";
import {
  SlideContentBuilder,
  SlideContentDataLoader,
  SLIDE_CONTENT_HANDLER,
} from "./slide-content-loader";

@Component({
  selector: "benji-slides",
  templateUrl: "./slides.component.html",
  styleUrls: ["./slides.component.scss"],
  animations: [
    trigger("slideIn", [
      transition("void => right", [
        style({ transform: "translateX(-100%)", opacity: 1 }),
        animate(
          "400ms ease-in",
          style({ transform: "translateX(0%)", opacity: 1 })
        ),
      ]),
      transition("right => void", [
        style({ transform: "translateX(0%)", opacity: 1 }),
        animate(
          "400ms ease-out",
          style({ transform: "translateX(0%)", opacity: 0 })
        ),
      ]),
      transition("void => left", [
        style({ transform: "translateX(100%)", opacity: 1 }),
        animate(
          "400ms ease-in",
          style({ transform: "translateX(0%)", opacity: 1 })
        ),
      ]),
      transition("left => void", [
        style({ transform: "translateX(0%)", opacity: 1 }),
        animate(
          "400ms ease-out",
          style({ transform: "translateX(0%)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SlidesComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  @Input() timer = 1000;
  @Input() slides: Slide[] = [];
  @Input() current: number = 0;
  // @Input() slideState = false;
  @Input() autostart: boolean = false;
  slideLeft: boolean = false;

  constructor(
    @Inject(SLIDE_CONTENT_HANDLER)
    private contentLoader: SlideContentDataLoader & SlideContentBuilder
  ) {
    // Load the slides only if not set by the parent component
    if (this.slides.length === 0) {
      const contents = this.contentLoader.contents;
      this.timer = contents.timer;
      this.slides = contents.slides.map((value, index: number) =>
        createSlide(index, value.data)
      );
    }
  }

  async ngOnInit() {
    if (this.autostart) {
      this.runLoop();
    }
  }

  /**
   * set slide loop
   */
  runLoop() {
    interval(this.timer)
      .pipe(
        takeUntil(this._destroy$),
        tap((_) => this.next())
      )
      .subscribe();
  }

  previous() {
    const previous = this.current - 1;
    this.slideLeft = true;
    this.current = previous < 0 ? this.slides.length - 1 : previous;
    this.restartLoop();
  }

  next() {
    const next = this.current + 1;
    this.slideLeft = false;
    this.current = next === this.slides.length ? 0 : next;
    this.restartLoop();
  }

  restartLoop() {
    this._destroy$.next();
    this.runLoop();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
