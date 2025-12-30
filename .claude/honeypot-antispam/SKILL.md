---
name: honeypot-antispam
description: Implement honeypot-based anti-spam protection for web forms without CAPTCHAs. Use when building contact forms, signup forms, comment forms, or any user input that needs bot protection. Provides ~99% spam blocking with zero user friction and no third-party dependencies. Lighter than reCAPTCHA with no PageSpeed impact.
---

# Honeypot Anti-Spam Protection

Lightweight, privacy-respecting spam prevention using hidden honeypot fields and signed tokens. No CAPTCHAs, no third-party services, no user friction.

## Core Technique

Two-layer honeypot combined with server-side validation:

| Layer | Field | How It Works | Catch Rate |
|-------|-------|--------------|------------|
| 1 | `website` | Hidden field bots fill, humans don't see | ~20-25% |
| 2 | `confirm_email` | JS-filled token field, bots can't execute | ~75% |
| 3 | Timing | Reject submissions under 3 seconds | Speed bots |

Combined effectiveness: ~99% without any user interaction.

## Implementation Pattern

### 1. Simple Honeypot Field

Add a hidden field that humans can't see but bots will fill:

```html
<div style="position: absolute; left: -9999px;" aria-hidden="true">
  <label for="website">Website (leave blank)</label>
  <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
</div>
```

Key attributes:
- `position: absolute; left: -9999px` - Invisible to humans
- `aria-hidden="true"` - Hidden from screen readers
- `tabindex="-1"` - Can't be tabbed to
- `autocomplete="off"` - Prevents browser autofill

### 2. JS-Required Token Field

Add a second hidden field that requires JavaScript to fill correctly:

```html
<div style="position: absolute; left: -9999px;" aria-hidden="true">
  <label for="confirm_email">Confirm email (required)</label>
  <input type="text" id="confirm_email" name="confirm_email" tabindex="-1" autocomplete="off">
</div>
```

Generate a signed token on the server and fill via JavaScript:

```javascript
// Token format: base64(timestamp).signature
// Signature: HMAC-SHA256(timestamp, secret_key)

document.addEventListener('DOMContentLoaded', () => {
  const token = "SERVER_GENERATED_TOKEN";  // Injected by server
  document.getElementById('confirm_email').value = token;
});
```

Why this works:
- Bots that don't execute JS leave it empty
- Since it looks "required", bots often fill it with the user's email
- The token is unique per page load, can't be hardcoded

### 3. Server-Side Validation

**Always validate on the server.** Client-side checks are trivially bypassed.

```
function validateSubmission(data):
  # Layer 1: Honeypot must be empty
  if data.website is not empty:
    return reject("honeypot_filled")

  # Layer 2: Token must be present and valid
  if data.confirm_email is empty:
    return reject("missing_token")

  token = data.confirm_email
  [timestamp_b64, signature] = token.split('.')
  timestamp = base64_decode(timestamp_b64)

  # Verify signature
  expected = hmac_sha256(timestamp, SECRET_KEY)
  if signature != base64_encode(expected):
    return reject("invalid_signature")

  # Check token age (max 1 hour)
  if now() - timestamp > 3600000:
    return reject("token_expired")

  # Check minimum time (at least 3 seconds)
  if now() - timestamp < 3000:
    return reject("too_fast")

  return accept()
```

### 4. Token Generation

Generate tokens server-side during page render:

```
function generateToken():
  timestamp = current_time_ms()
  signature = hmac_sha256(timestamp.toString(), SECRET_KEY)
  return base64_encode(timestamp) + "." + base64_encode(signature)
```

Requirements:
- Use a strong secret key (32+ random bytes)
- Store secret in environment variable, never in code
- Generate fresh token per page load

## Error Messages

Return generic errors to avoid leaking detection methods:

| Internal Reason | User-Facing Message |
|----------------|---------------------|
| honeypot_filled | "Something went wrong. Please try again." |
| missing_token | "Something went wrong. Please try again." |
| invalid_signature | "Something went wrong. Please try again." |
| token_expired | "Form expired. Please refresh and try again." |
| too_fast | "Please take your time filling out the form." |

Log the actual reason server-side for monitoring.

## Security Considerations

1. **Server-side validation is mandatory** - Client checks are for UX only
2. **Use constant-time comparison** for signature verification to prevent timing attacks
3. **Rotate secrets periodically** - Old tokens auto-expire anyway
4. **Rate limit by IP** - Additional layer against determined attackers
5. **Log failures** - Monitor for attack patterns

## Advantages Over reCAPTCHA

- Zero PageSpeed impact (no external scripts)
- No privacy concerns (no data sent to Google)
- No user friction (invisible protection)
- Works offline / in restricted environments
- No API keys or quotas to manage
- Accessible by default

## Limitations

- Sophisticated bots with full browser rendering can bypass (rare)
- Users with JS disabled can't submit (acceptable tradeoff)
- Not suitable for high-value targets (banks, etc.) - use additional measures
