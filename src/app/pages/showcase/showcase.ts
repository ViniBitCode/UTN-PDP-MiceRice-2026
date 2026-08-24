import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GITHUB_PROFILE_URL, REPO_DIR_NAME, SITE_CONFIG } from '../../site.config';
import { RevealDirective } from '../../reveal.directive';

@Component({
  selector: 'app-showcase',
  imports: [RouterLink, RevealDirective],
  templateUrl: './showcase.html',
  styleUrl: './showcase.css',
})
export class Showcase {
  protected readonly config = SITE_CONFIG;
  protected readonly githubProfileUrl = GITHUB_PROFILE_URL;

  protected readonly copied = signal(false);

  protected readonly runCommands = [
    `git clone ${SITE_CONFIG.repoUrl}.git`,
    `cd ${REPO_DIR_NAME}`,
    'npm i -g wollok-ts-cli',
    'wollok run',
  ].join('\n');

  protected copyCommands(): void {
    navigator.clipboard?.writeText(this.runCommands).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
