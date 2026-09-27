export function ContactForm({ profile, onChange, errors }) {
  const fields = [
    ['fullName', 'Full name', 'Your Name'], ['role', 'Title or subtitle (optional)', 'Creator'], ...(profile.mode === 'business' ? [['company', 'Business name (optional)', 'Leave blank if included in your logo'], ['businessLocation', 'Business address / location (optional)', 'City, service area or street address']] : []),
    ['email', 'Email', 'you@example.com'], ['phone', 'Phone', '+27 00 000 0000'], ['website', 'Website', 'https://example.com'],
    ['tagline', 'Sign-off or tagline', 'Let’s keep in touch'],
  ];
  return <div className="form-grid">{fields.map(([key, label, placeholder]) => <label key={key}>
    <span>{label}</span><input value={profile[key]} placeholder={placeholder} onChange={(event) => onChange(key, event.target.value)} />
    {errors[key] && <small className="error">{errors[key]}</small>}
  </label>)}</div>;
}
