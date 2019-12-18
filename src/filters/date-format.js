export default function dateFormat (value) {
  if (value) {
    return value.replace(/[^0-9]/g, '')
        .replace(/(\d{4})(\d{2})(\d{2})/, '$3.$2.$1');
  }
}