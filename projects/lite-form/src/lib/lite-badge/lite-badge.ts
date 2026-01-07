import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeFieldDto } from '../field-dto';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lite-badge',
  templateUrl: './lite-badge.html',
  styleUrls: ['../lite-styles.scss']
})
export class LiteBadge {
  badge = input.required<BadgeFieldDto>();
  remove = output<void>();

  onRemove(event: Event) {
    event.stopPropagation();
    this.remove.emit();
  }

  getVariantClass(): string {
    const variant = this.badge().variant || 'default';
    return `badge-${variant}`;
  }

  getSizeClass(): string {
    const size = this.badge().size || 'medium';
    return `badge-${size}`;
  }
}
