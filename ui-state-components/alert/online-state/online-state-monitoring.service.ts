import { DOCUMENT } from "@angular/common";
import {
  inject,
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy,
  Optional,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const BROWSER_WINDOW = new InjectionToken<Window>(
  "An abstraction over window object",
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error("Window is not available");
      }

      return defaultView;
    },
  }
);

/**
 * @description Enumerated values specifying the connection status of the current application navigator
 */
export enum ConnectionStatus {
  OFFLINE = 0,
  ONLINE = 1,
}

enum EventType {
  ONLINE_EVENT = "online",
  OFFLINE_EVENT = "offline",
}

@Injectable({
  providedIn: "root",
})
export class OnlineStateMonitoring implements OnDestroy {
  // tslint:disable-next-line: variable-name
  private _connectionStatus = new BehaviorSubject(ConnectionStatus.ONLINE);
  connectionStatus$ = this._connectionStatus.asObservable();

  constructor(@Inject(BROWSER_WINDOW) @Optional() private window?: Window) {}

  registerToConnectionStates = () => {
    this.window?.addEventListener(EventType.ONLINE_EVENT, () => {
      this._connectionStatus.next(ConnectionStatus.ONLINE);
    });
    this.window?.addEventListener(EventType.OFFLINE_EVENT, () => {
      this._connectionStatus.next(ConnectionStatus.OFFLINE);
    });
  };

  setState = (state: ConnectionStatus) => {
    this._connectionStatus.next(state);
  };

  ngOnDestroy(): void {
    this.window?.removeEventListener(EventType.ONLINE_EVENT, () => {});
    this.window?.removeEventListener(EventType.OFFLINE_EVENT, () => {});
    this._connectionStatus.complete();
  }
}
