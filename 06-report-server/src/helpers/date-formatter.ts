export class DateFormatter {

  static formatter = Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static forgetDDMMMMYYYYmat(date: Date): string {
    return this.formatter.format(date);
  }

}