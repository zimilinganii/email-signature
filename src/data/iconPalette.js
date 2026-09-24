export const iconPalette = [
  { id: 'lavender', label: 'Lavender', color: '#a6a8d4' },
  { id: 'black', label: 'Black', color: '#242424' },
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'slate', label: 'Slate', color: '#64748b' },
  { id: 'blue', label: 'Blue', color: '#2563eb' },
  { id: 'teal', label: 'Teal', color: '#0f766e' },
  { id: 'green', label: 'Green', color: '#265f47' },
  { id: 'gold', label: 'Gold', color: '#a16207' },
  { id: 'rose', label: 'Rose', color: '#be185d' },
  { id: 'purple', label: 'Purple', color: '#7c3aed' },
];
export function resolveIconColor(choice, background = '#ffffff') {
  if (choice === 'auto') {
    const hex = /^#[0-9a-f]{6}$/i.test(background) ? background.slice(1) : 'ffffff';
    const channels = [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
    return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722>0.179?'black':'white';
  }
  return iconPalette.some(item=>item.id===choice) ? choice : 'default';
}
export function themedIconName(name, choice, background) {
  const color = resolveIconColor(choice, background);
  return color === 'default' ? name : `colors/${color}/${name}`;
}
