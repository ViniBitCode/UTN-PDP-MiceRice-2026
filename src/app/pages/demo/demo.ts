import {
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_CONFIG } from '../../site.config';

@Component({
  selector: 'app-demo',
  imports: [RouterLink],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo {
  protected readonly config = SITE_CONFIG;

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly gameUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    SITE_CONFIG.gameLocalUrl,
  );

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  /** Factor de escala para que el juego (1650x900) entre en el ancho disponible. */
  protected readonly scale = signal(1);

  constructor() {
    afterNextRender(() => this.updateScale());
  }

  @HostListener('window:resize')
  protected updateScale(): void {
    const available = this.stage().nativeElement.clientWidth;
    this.scale.set(Math.min(1, available / SITE_CONFIG.gameWidth));
  }
}
