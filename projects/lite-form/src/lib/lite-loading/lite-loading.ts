import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoadingView = 'spinner' | 'progress';

@Component({
  selector: 'lite-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lite-loading.html',
  styleUrls: ['../lite-styles.scss', './lite-loading.scss']
})
export class LiteLoading {
  /**
   * The view type: 'spinner' for loading wheel, 'progress' for progress bar
   */
  view = input<LoadingView>('spinner');

  /**
   * Progress percentage (0-100). If undefined, shows indeterminate progress.
   * Only applies when view is 'progress'.
   */
  progress = input<number | undefined>(undefined);

  /**
   * Optional message to display below the loading indicator
   */
  message = input<string | undefined>(undefined);

  /**
   * Size of the spinner (only applies to spinner view)
   */
  size = input<'small' | 'medium' | 'large'>('medium');

  /**
   * Whether the loading indicator is visible
   */
  visible = input<boolean>(true);

  /**
   * Computed property to determine if progress is defined
   */
  isProgressDefined = computed(() => {
    const progressValue = this.progress();
    return progressValue !== undefined && progressValue !== null;
  });

  /**
   * Computed property to get clamped progress value (0-100)
   */
  progressValue = computed(() => {
    const progressValue = this.progress();
    if (progressValue === undefined || progressValue === null) {
      return 0;
    }
    return Math.max(0, Math.min(100, progressValue));
  });

  /**
   * Computed property for spinner size class
   */
  spinnerSizeClass = computed(() => {
    return `lite-loading__spinner--${this.size()}`;
  });
}
