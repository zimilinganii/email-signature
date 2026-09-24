export function ContactForm({ profile, onChange, errors }) {
  const fields = [
    ['fullName', 'Full name', 'Your Name'], ...(profile.mode === 'business' ? [['role', 'Role or title', 'Designer'], ['company', 'Business name', 'Company name']] : []),
    ['email', 'Email', 'you@example.com'], ['phone', 'Phone', '+27 00 000 0000'], ['website', 'Website', 'https://example.com'],
    ['tagline', 'Sign-off or tagline', 'Let’s keep in touch'],
  ];
  return <div className="form-grid">{fields.map(([key, label, placeholder]) => <label key={key}>
    <span>{label}</span><input value={profile[key]} placeholder={placeholder} onChange={(event) => onChange(key, event.target.value)} />
    {errors[key] && <small className="error">{errors[key]}</small>}
  </label>)}</div>;
}
