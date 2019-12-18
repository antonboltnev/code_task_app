export default function toFix (value) {
  let name = value;
  name = name.split(' ');
  name.splice(name.length - 1,1);
  name = name.join(' ');
  return name;
}
