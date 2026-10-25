// The site's inbound contact address, and the mailto: URL the header button
// uses. Kept in one module rather than inlined in JSX so the address is a
// single source of truth — it is the only thing here likely to change.

/** Inbound contact address for the site. Single source of truth — do not inline. */
export const CONTACT_EMAIL = 'k12schoolResearcher@gmail.com'

/**
 * Subject stays ENGLISH in every locale (per the design handoff): it routes
 * inbound mail into one recognisable bucket, so it is deliberately NOT a
 * catalog string in src/locales/*.json. The dash is an em dash, U+2014.
 */
export const CONTACT_SUBJECT = 'Charlotte School Insights — Inquiry'

/**
 * `mailto:` href for a school staff member, subject "<School name> Inquiry".
 * English in every locale for the same reason as CONTACT_SUBJECT: the school
 * reads it, and the name is a proper noun.
 */
export function schoolInquiryMailto(email: string, schoolName: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(`${schoolName} Inquiry`)}`
}

/** `mailto:` href with the subject URL-encoded. No body is pre-filled. */
export function contactMailto(): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`
}
