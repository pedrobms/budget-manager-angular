export class FormError {
  field: string;
  error: string;

  constructor(field: string, error: string) {
    this.field = field;
    this.error = error;
  }
}
