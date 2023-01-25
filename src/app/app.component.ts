import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
  keyframes,
} from '@angular/animations';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Normal animation
    trigger('wideNarrow', [
      state(
        'wide',
        style({
          width: '400px',
        })
      ),
      state(
        'narrow',
        style({
          width: '280px',
        })
      ),
      transition('wide => narrow', [animate('1s')]),
      transition('narrow => wide', [animate('0.5s')]),
    ]),

    // Keyframes animation
    trigger('background', [
      state('background', style({ backgroundColor: '#d45050' })),
      state('noBackground', style({ backgroundColor: '#ffffff' })),
      transition('noBackground => background', [
        animate(
          '2s',
          keyframes([
            style({ backgroundColor: '#ffffff', offset: '0' }), // 0%
            style({ backgroundColor: '#e3b1b1', offset: '0.5' }), // 50%
            style({ backgroundColor: '#d45050', offset: '1' }), // 100%
          ])
        ),
      ]),
      transition('background => noBackground', [
        animate(
          '2s',
          keyframes([
            style({ backgroundColor: '#d45050' }), // 0%
            style({ backgroundColor: '#e3b1b1' }), // 50%
            style({ backgroundColor: '#ffffff' }), // 100%
          ])
        ),
      ]),
    ]),

    // DOM elements entering / leaving animation (For elements with ngIf / ngFor)
    trigger('fadeInOut', [
      // :enter is equivalent to writting void => *
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      //:leave is equivalent to writting * => void
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  public isWide = false;
  public isBackground = false;
  public isShown = true;

  toggleNormalAnimation() {
    this.isWide = !this.isWide;
  }

  toggleBackgroundAnimation() {
    this.isBackground = !this.isBackground;
  }

  toggleDOMChangeAnimation() {
    this.isShown = !this.isShown;
  }

  animationStart(event: AnimationEvent) {
    console.log('wideNarrow animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.log('wideNarrow animation done: ', event);
  }
}
