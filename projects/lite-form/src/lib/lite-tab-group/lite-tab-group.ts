import { CommonModule } from '@angular/common';
import { Component, input, output, signal, effect, TemplateRef, ContentChildren, QueryList, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { LiteTabContent } from '../lite-tab-content';

export interface LiteTabItem {
  label: string;
  content?: string; // simple HTML content support via innerHTML
}

@Component({
  selector: 'lite-tab-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lite-tab-group.html',
  styleUrls: ['../lite-styles.scss']
})
export class LiteTabGroup implements AfterViewInit, OnDestroy {
  @ContentChildren(LiteTabContent) tabContents!: QueryList<LiteTabContent>;
  @ViewChild('tabWrapper') tabWrapper?: ElementRef<HTMLDivElement>;
  tabs = input.required<LiteTabItem[]>();
  activeIndex = input<number>(0);
  tabChange = output<number>();


  // Internal state mirrors activeIndex input to allow local interaction
  private internalActiveIndex = signal(0);
  private wrapperWidth = signal(0);
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      // keep internal index in sync with input
      const idx = this.activeIndex();
      if (typeof idx === 'number') {
        this.internalActiveIndex.set(idx);
      }
    });

    // Re-measure when tab labels array changes (e.g., count or visibility changes)
    effect(() => {
      // Access length to create dependency
      const _len = this.tabs()?.length ?? 0;
      // Schedule measure next tick (layout stable)
      queueMicrotask(() => this.measure());
    });
  }

  ngAfterViewInit(): void {
    this.measure();
    queueMicrotask(() => this.measure());

    // Observe wrapper size changes
    const el = this.tabWrapper?.nativeElement;
    if (el && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.measure());
      this.resizeObserver.observe(el);
    }

    // Observe content changes
    this.tabContents?.changes?.subscribe(() => this.measure());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.measure();
  }

  private measure(): void {
    const w = this.tabWrapper?.nativeElement?.clientWidth ?? 0;
    if (w && w !== this.wrapperWidth()) this.wrapperWidth.set(w);
  }

  isActive(index: number): boolean {
    return this.internalActiveIndex() === index;
  }

  onTabClick(index: number) {
    if (index === this.internalActiveIndex()) return;
    this.internalActiveIndex.set(index);
    this.tabChange.emit(index);
  }

  currentContent(): string | undefined {
    const items = this.tabs();
    const idx = this.internalActiveIndex();
    return items?.[idx]?.content;
  }

  getTabTemplate(index: number): TemplateRef<unknown> | null {
    const contents = this.tabContents?.toArray();
    return contents?.[index]?.template || null;
  }

  get activeSlideIndex(): number {
    return this.internalActiveIndex();
  }

  get paneWidthPx(): string {
    return `${this.wrapperWidth()}px`;
  }

  get tabTransformPx(): string {
    return `translateX(-${this.internalActiveIndex() * this.wrapperWidth()}px)`;
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
