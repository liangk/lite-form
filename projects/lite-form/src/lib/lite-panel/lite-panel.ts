import { CommonModule } from '@angular/common';
import { Component, TemplateRef, computed, input, output } from '@angular/core';

export interface LitePanelAction {
  label: string;
  value?: unknown;
  /**
   * Adds a CSS modifier class `lite-panel__action--${variant}` to let consumers style the action button.
   */
  variant?: 'primary' | 'secondary' | 'danger';
}

let panelIdCounter = 0;

@Component({
  standalone: true,
  selector: 'lite-panel',
  imports: [CommonModule],
  templateUrl: './lite-panel.html',
  styleUrls: ['../lite-styles.scss', './lite-panel.scss']
})
export class LitePanel {
  title = input<string | null>(null);
  content = input<string | TemplateRef<unknown> | null>(null);
  actions = input<LitePanelAction[] | null>(null);
  closeOnOverlayClick = input<boolean>(true);
  width = input<string | number | null>(null);
  height = input<string | number | null>(null);
  maxWidth = input<string | number | null>(null);
  maxHeight = input<string | number | null>(null);

  closed = output<unknown | null>();

  readonly panelTitleId = `lite-panel-title-${++panelIdCounter}`;

  private readonly defaultActions = [{ label: 'OK', value: null, variant: 'primary' }] satisfies LitePanelAction[];

  readonly resolvedActions = computed(() => {
    const provided = this.actions();
    return provided && provided.length ? provided : this.defaultActions;
  });

  readonly contentTemplate = computed(() => {
    const value = this.content();
    return value instanceof TemplateRef ? value : null;
  });

  readonly contentText = computed(() => {
    const value = this.content();
    return typeof value === 'string' ? value : null;
  });

  readonly templateContext: { panel: LitePanel; close: (value?: unknown) => void } = {
    panel: this,
    close: (value?: unknown) => this.close(value ?? null)
  };

  readonly panelStyles = computed(() => {
    const styles: Record<string, string> = {};
    const candidates: Array<[string, string | number | null | undefined]> = [
      ['width', this.width()],
      ['height', this.height()],
      ['max-width', this.maxWidth()],
      ['max-height', this.maxHeight()]
    ];

    for (const [prop, value] of candidates) {
      if (!this.isNilOrEmpty(value)) {
        styles[prop] = this.toCssLength(value as string | number);
      }
    }

    return styles;
  });

  close(value: unknown | null = null): void {
    this.closed.emit(value ?? null);
  }

  onBackdropClick(): void {
    if (this.closeOnOverlayClick()) {
      this.close(null);
    }
  }

  onAction(action: LitePanelAction): void {
    const emitted = Object.prototype.hasOwnProperty.call(action, 'value') ? action.value : null;
    this.close(emitted as unknown | null);
  }

  getActionClasses(action: LitePanelAction): Record<string, boolean> {
    return {
      'lite-panel__action': true,
      [`lite-panel__action--${action.variant}`]: !!action.variant
    };
  }

  private toCssLength(value: string | number): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value.trim();
  }

  private isNilOrEmpty(value: string | number | null | undefined): value is null | undefined | '' {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }

    return false;
  }
}
