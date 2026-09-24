export function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export function validateProfile(profile) {
  const errors = {};
  if (!profile.fullName.trim()) errors.fullName = 'Your name is required.';
  if (!isValidEmail(profile.email)) errors.email = 'Enter a valid email address.';
  if (!isValidUrl(profile.website)) errors.website = 'Use a full http or https website URL.';
  profile.links.forEach((link, index) => {
    if (link.enabled && link.url && !isValidUrl(link.url)) errors[`link-${index}`] = `${link.label} needs a valid URL.`;
  });
  return errors;
}
