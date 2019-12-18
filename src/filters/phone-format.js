export default function phoneFormat (value) {
  if (value) {
    return value.replace(/[^0-9]/g, '')
        .replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
  }
}