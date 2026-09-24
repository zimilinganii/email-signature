import { iconPalette } from '../data/iconPalette';
export function IconColorControl({profile,onChange}) {
  const selected=profile.iconColor || 'default';
  return <fieldset className="icon-colors"><legend>Icon color</legend><div className="icon-color-options">
    <button type="button" aria-pressed={selected==='default'} onClick={()=>onChange('iconColor','default')}>Original</button>
    <button type="button" aria-pressed={selected==='auto'} onClick={()=>onChange('iconColor','auto')}>Auto contrast</button>
    {iconPalette.map(item=><button type="button" key={item.id} aria-label={`${item.label} icons`} title={item.label} aria-pressed={selected===item.id} onClick={()=>onChange('iconColor',item.id)}><span aria-hidden="true" style={{backgroundColor:item.color}}/>{item.label}</button>)}
  </div><p className="hint">Choose a color to coordinate with your background, or use Auto contrast for light icons on dark backgrounds and dark icons on light backgrounds. Your choice is included when you copy or download.</p></fieldset>;
}
