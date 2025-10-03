import { CommonModule } from '@angular/common';
import { Component, TemplateRef, Type, ViewContainerRef, ViewChild, ComponentRef, AfterViewInit, OnDestroy, computed, input, output } from '@angular/core';

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
export class LitePanel implements AfterViewInit, OnDestroy {
  title = input<string | null>(null);
  content = input<string | TemplateRef<unknown> | Type<any> | null>(null);
  contentInputs = input<Record<string, any> | null>(null);
  actions = input<LitePanelAction[] | null>(null);
  closeOnOverlayClick = input<boolean>(true);
  width = input<string | number | null>(null);
  height = input<string | number | null>(null);
  maxWidth = input<string | number | null>(null);
  maxHeight = input<string | number | null>(null);

  closed = output<unknown | null>();

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer?: ViewContainerRef;

  readonly panelTitleId = `lite-panel-title-${++panelIdCounter}`;
  private componentRef?: ComponentRef<any>;

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

  readonly contentComponent = computed(() => {
    const value = this.content();
    // Check if it's a component type (function/class but not TemplateRef)
    return value && typeof value === 'function' && !(value instanceof TemplateRef) ? value : null;
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
    let emitted = Object.prototype.hasOwnProperty.call(action, 'value') ? action.value : null;
    
    // If there's a dynamic component with a getData method, include its data
    if (this.componentRef?.instance && typeof this.componentRef.instance.getData === 'function') {
      const componentData = this.componentRef.instance.getData();
      emitted = { action: emitted, data: componentData };
    }
    
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

  ngAfterViewInit(): void {
    this.loadDynamicComponent();
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  private loadDynamicComponent(): void {
    const component = this.contentComponent();
    if (component && this.dynamicComponentContainer) {
      this.dynamicComponentContainer.clear();
      this.componentRef = this.dynamicComponentContainer.createComponent(component);
      
      // Apply inputs if provided
      const inputs = this.contentInputs();
      if (inputs) {
        Object.entries(inputs).forEach(([key, value]) => {
          if (this.componentRef) {
            // Use setInput to properly handle both input signals and @Input decorators
            this.componentRef.setInput(key, value);
          }
        });
      }
      
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }
}
