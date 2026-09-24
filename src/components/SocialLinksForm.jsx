import { platformOptions } from '../data/defaultProfile';

export function SocialLinksForm({ links, onChange, errors }) {
  function update(index, key, value) { onChange(links.map((link, i) => i === index ? { ...link, [key]: value } : link)); }
  function addLink() { onChange([...links, { id: crypto.randomUUID(), label: 'Portfolio', url: '', enabled: true }]); }
  return <div className="links-list">{links.map((link, index) => <div className="link-row" key={link.id}>
    <input value={link.label} list="platforms" aria-label="Platform name" onChange={(e) => update(index, 'label', e.target.value)} />
    <input value={link.url} aria-label={`${link.label} URL`} placeholder="https://..." onChange={(e) => update(index, 'url', e.target.value)} />
    <label className="checkbox"><input type="checkbox" checked={link.enabled} onChange={(e) => update(index, 'enabled', e.target.checked)} /> Show</label>
    <button className="icon-button" type="button" onClick={() => onChange(links.filter((_, i) => i !== index))} aria-label={`Remove ${link.label}`}>×</button>
    {errors[`link-${index}`] && <small className="error full-row">{errors[`link-${index}`]}</small>}
  </div>)}<datalist id="platforms">{platformOptions.map((name) => <option key={name} value={name} />)}</datalist><button type="button" className="secondary" onClick={addLink}>+ Add platform</button></div>;
}
