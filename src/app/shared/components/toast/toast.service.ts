import { Injectable, TemplateRef } from '@angular/core';

const DEFAULT_DELAY = 3000;

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

  showSuccess(text: string, delay: number = DEFAULT_DELAY) {
    this.show(text, { classname: 'bg-success text-light', delay: delay });
  }

  showError(text: string, delay: number = DEFAULT_DELAY ) {
    this.show(text, { classname: 'bg-danger text-light', delay: delay });
  }

  showInfo(text: string, delay: number = DEFAULT_DELAY ) {
    this.show(text, { classname: 'bg-info text-light', delay: delay });
  }

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
