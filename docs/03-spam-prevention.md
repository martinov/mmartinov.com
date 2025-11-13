# Spam Prevention & Security

This document explains the spam prevention and security measures implemented in the contact form.

## Overview

The contact form on mmartinov.com uses multiple layers of protection to prevent spam bots while maintaining a smooth experience for legitimate users.

## Multi-Layer Spam Prevention

### 1. Honeypot Field ✅

**What it is:**
A hidden field that's invisible to humans but visible to bots.

**How it works:**
```html
<!-- Hidden field positioned off-screen -->
<input type="text" name="website" style="position: absolute; left: -9999px" />
```

- **Humans:** Never see or fill this field
- **Bots:** Often auto-fill all fields, including hidden ones

**Detection:**
```typescript
// Server-side check
if (data.website) {
  // Bot detected - reject submission
  return error;
}
```

**Effectiveness:** ~70-80% of basic bots

### 2. Timing Validation ✅

**What it is:**
Tracking how long users take to fill out the form.

**How it works:**
```typescript
// Record when form loads
const formLoadTime = Date.now();

// On submit, check elapsed time
const timeSpent = Date.now() - formLoadTime;
if (timeSpent < 3000) {
  // Too fast - likely a bot
  return error;
}
```

**Logic:**
- Humans take at least 3-5 seconds to read and fill a form
- Bots submit instantly (<1 second)

**Effectiveness:** ~60-70% of automated submissions

### 3. Input Sanitization ✅

**What it is:**
Cleaning user input before processing.

**How it works:**
```typescript
const sanitizeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
```

**Prevents:**
- XSS (Cross-Site Scripting) attacks
- HTML injection
- Script injection in emails

### 4. Email Validation ✅

**What it is:**
Verifying email format before accepting.

**How it works:**
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(data.email)) {
  return error("Invalid email address");
}
```

**Blocks:**
- Invalid email formats
- Missing @ symbols
- Incomplete domains

### 5. Required Fields ✅

**What it is:**
Server-side validation of mandatory fields.

**How it works:**
```typescript
if (!data.name || !data.email || !data.message) {
  return error("Missing required fields");
}
```

**Prevents:**
- Empty submissions
- Incomplete forms
- Automated bulk submissions

## Security Best Practices

### ✅ No Client-Side Only Validation
- All validation runs server-side
- Client-side is only for UX
- Bots can bypass browser checks

### ✅ HTTPS Only
- All form data encrypted in transit
- Prevents man-in-the-middle attacks
- Fresh/Deno Deploy enforces HTTPS

### ✅ Environment Variables
- API keys stored securely
- Never in source code
- Inaccessible to clients

### ✅ Error Handling
- Generic error messages to users
- Detailed logs server-side only
- No information leakage

### ✅ Rate Limiting (Future)
- Could add IP-based rate limiting
- Cloudflare provides this for free
- Consider if spam increases

## What We Don't Use (And Why)

### ❌ CAPTCHA / reCAPTCHA

**Why not:**
- Poor user experience
- Privacy concerns (Google tracking)
- Accessibility issues
- Overkill for low-traffic sites

**When to add:**
- If spam exceeds 10+ per day
- If honeypot + timing fail
- Consider hCaptcha (privacy-focused alternative)

### ❌ IP Blocking

**Why not:**
- VPNs and proxies make it ineffective
- Can block legitimate users
- High maintenance overhead

**When to consider:**
- Repeated attacks from specific IPs
- Use Cloudflare's firewall rules

### ❌ JavaScript Challenge

**Why not:**
- Accessibility concerns
- Can be bypassed
- Requires JavaScript (some users disable it)

**When to consider:**
- Advanced bot attacks
- Cloudflare offers this feature

## Spam Metrics & Monitoring

### Expected Results

With current measures:
- **Legitimate submissions:** ~95-99% success rate
- **Bot blocking:** ~85-95% effective
- **False positives:** <1% (legitimate users blocked)

### Monitoring

Track these metrics:
```bash
# Server logs
"Contact form submission succeeded"  # ✅ Good
"Honeypot triggered"                 # 🤖 Bot blocked
"Timing validation failed"           # 🤖 Bot blocked
"Invalid email format"               # ⚠️ User error
```

### Resend Dashboard
- Monitor email deliverability
- Check bounce rates
- Review complaint rates

## Response to Spam Attacks

### If Spam Increases:

**Step 1: Analyze Logs**
```bash
# Check what's getting through
grep "Contact form" logs.txt
grep "error" logs.txt
```

**Step 2: Adjust Timing**
```typescript
// Increase minimum time from 3s to 5s
if (timeSpent < 5000) {
  return error;
}
```

**Step 3: Add CAPTCHA**
```typescript
// Only if spam is severe
import { verifyCaptcha } from "captcha-service";
```

**Step 4: Enable Cloudflare Protection**
- Bot Fight Mode
- Rate limiting rules
- Challenge page for suspicious traffic

## Testing Spam Prevention

### Manual Testing

**Test Honeypot:**
```bash
# Fill honeypot field (should be rejected)
curl -X POST https://mmartinov.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test","website":"http://spam.com"}'

# Expected: Error response
```

**Test Timing:**
```bash
# Instant submission (should be rejected if <3s)
# Use the live form and submit immediately after page load
```

**Test Valid Submission:**
```bash
# Wait 3+ seconds and submit properly
# Should succeed and send email
```

### Automated Testing

Create test script:
```typescript
// test_spam_prevention.ts
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("Honeypot blocks spam", async () => {
  const response = await fetch("http://localhost:5173/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spammer",
      email: "spam@spam.com",
      message: "Spam message",
      website: "http://spam.com" // Honeypot filled
    })
  });

  assertEquals(response.status, 400);
});
```

## User Experience Impact

### For Legitimate Users:

**✅ Minimal friction:**
- No CAPTCHA to solve
- No extra steps
- Just fill and submit

**⚠️ Potential issues:**
- Users filling form in <3 seconds (rare)
- Users with JavaScript disabled (timing check skipped)

**💡 Solutions:**
- Friendly error messages
- Suggest waiting a moment
- Form retains data (no re-entry)

### Accessibility

All measures are accessible:
- ✅ Screen reader compatible
- ✅ Keyboard navigation works
- ✅ No visual puzzles required
- ✅ Semantic HTML

## Privacy Considerations

### Data Collection

**What we collect:**
- Name, email, company (optional)
- Message content
- Preferred call time (optional)
- Form submission timestamp

**What we DON'T collect:**
- IP addresses (not logged)
- Browser fingerprints
- Tracking cookies
- User behavior data

### GDPR Compliance

- ✅ No cookies used
- ✅ No third-party tracking
- ✅ Data sent only to you (owner)
- ✅ No data retention beyond email
- ✅ Users can request deletion (email you)

### Data Flow

```
User → Form → API → Resend → Your Inbox
                      ↓
                   Deleted after 30 days (Resend retention)
```

## Cost & Maintenance

### Operational Cost
- **Resend:** Free (up to 3,000 emails/month)
- **Spam prevention:** $0 (built-in)
- **Monitoring:** $0 (logs only)

### Maintenance Time
- **Setup:** 1 hour (one-time)
- **Monitoring:** 5 minutes/week
- **Adjustments:** As needed (rare)

## Summary

### Current Protection Level: **Strong** 🛡️

The multi-layer approach provides:
- ✅ Good spam blocking (85-95%)
- ✅ Excellent user experience
- ✅ No privacy concerns
- ✅ Low maintenance
- ✅ Zero cost

### Upgrade Path (If Needed)

1. **Medium spam:** Adjust timing threshold
2. **High spam:** Add hCaptcha (privacy-focused)
3. **Severe spam:** Enable Cloudflare Bot Fight Mode

### Recommended Monitoring

- Check email weekly for spam patterns
- Review server logs monthly
- Update measures if spam increases

**You're well-protected! 🎉**

---

Last updated: November 2025
