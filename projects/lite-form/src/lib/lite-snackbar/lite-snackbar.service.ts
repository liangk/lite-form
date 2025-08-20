import { Injectable } from '@angular/core';
import { SnackbarType } from '../field-dto';

@Injectable({ providedIn: 'root' })
export class LiteSnackbarService {
  private timeoutId: any;
  private snackbarElem: HTMLElement | null = null;

  show(text: string, type: SnackbarType = 'done', duration: number = 3000) {
    this.clear();
    this.snackbarElem = document.createElement('div');
    this.snackbarElem.className = `lite-snackbar ${type}`;
    this.snackbarElem.innerHTML = `
      <div class="icon">${this.getIcon(type)}</div>
      <div class="text">${this.escapeHtml(text)}</div>
    `;
    this.injectStyles();
    document.body.appendChild(this.snackbarElem);
    this.timeoutId = setTimeout(() => this.clear(), duration);
  }

  clear() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.snackbarElem && this.snackbarElem.parentNode) {
      this.snackbarElem.parentNode.removeChild(this.snackbarElem);
    }
    this.snackbarElem = null;
  }

  private getIcon(type: SnackbarType) {
    if (type === 'done') {
      return `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (type === 'warn') {
      return `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10"/><path d="M10 6V11" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="14" r="1" fill="#fff"/></svg>`;
    }
    if (type === 'error') {
      return `<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    return '';
  }

  private injectStyles() {
    if (document.getElementById('lite-snackbar-style')) return;
    const style = document.createElement('style');
    style.id = 'lite-snackbar-style';
    style.innerHTML = `
      .lite-snackbar {
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        min-width: 200px;
        max-width: 90vw;
        padding: 8px 15px 8px 5px;
        border-radius: 6px;
        color: #fff;
        font-size: 1rem;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        z-index: 9999;
        opacity: 0.9;
        animation: snackbar-in 0.2s;
      }
      .lite-snackbar.done { background: #3a82eeff; }
      .lite-snackbar.warn { background: #f7b731; }
      .lite-snackbar.error { background: #e74c3c; }
      .lite-snackbar .icon { margin-right: 5px; height: 30px; }
      @keyframes snackbar-in {
        from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
        to { opacity: 0.9; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  private escapeHtml(text: string) {
    return text.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c]||c));
  }
}
