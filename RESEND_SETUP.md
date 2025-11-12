# Resend Email Integration Setup Guide

This guide covers setting up Resend for the contact form email delivery on mmartinov.com.

## Why Resend?

- **Modern API**: Clean, simple REST API built for developers
- **Deno-friendly**: Works seamlessly with Deno and Fresh
- **Reliable**: High deliverability rates
- **Great DX**: Easy to test and debug
- **Generous free tier**: 3,000 emails/month free

## Setup Steps

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email (or GitHub)
3. Verify your email address

### 2. Get API Key

1. Navigate to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it: `mmartinov.com Production`
4. Select permissions: **Sending access** (default)
5. Click "Create"
6. **Copy the API key** (you won't see it again!)
7. Store it securely (password manager or env vars)

### 3. Verify Domain (Important!)

To send from `website@mmartinov.com`, you need to verify the domain:

1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `mmartinov.com`
4. Follow DNS instructions:
   - Add the provided **TXT** record to your DNS
   - Add the provided **MX** records (optional but recommended)
   - Add **DKIM** records for better deliverability

**DNS Records Example:**
```
Type: TXT
Name: _resend
Value: resend-verify=abc123xyz...
TTL: 3600

Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN...
TTL: 3600
```

5. Wait for DNS propagation (usually 5-15 minutes)
6. Click "Verify" in Resend dashboard
7. Status should change to ✅ **Verified**

### 4. Configure Environment Variable

#### For Local Development:
```bash
# Create .env file in project root
echo 'RESEND_API_KEY=re_your_actual_api_key_here' > .env
```

#### For Deno Deploy:
1. Go to your Deno Deploy project
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_api_key_here`
4. Click "Add"
5. Redeploy if necessary

#### For Other Platforms:

**Vercel:**
```bash
vercel env add RESEND_API_KEY
# Paste your API key when prompted
```

**Netlify:**
```bash
# Site settings → Environment variables
# Add: RESEND_API_KEY = re_your_key
```

**Railway:**
```bash
# Variables tab
# Add: RESEND_API_KEY = re_your_key
```

### 5. Test the Integration

#### Test Locally:
```bash
# Make sure .env file exists with RESEND_API_KEY
deno task dev

# Visit http://localhost:5173/contact
# Fill out the form with test data
# Submit
# Check terminal for logs
# Check your inbox at me@mmartinov.com
```

#### Test in Production:
```bash
# After deployment
# Visit https://mmartinov.com/contact
# Submit test form
# Check me@mmartinov.com inbox
```

## Email Configuration Details

### From Address
- **From:** `Martin Martinov Website <website@mmartinov.com>`
- **Reply-To:** Sender's email (from form)
- **To:** `me@mmartinov.com`

### Email Template
The email includes:
- Professional HTML design
- Sender's name, email, company
- Message content (sanitized for security)
- Preferred call time (if provided)
- Timestamp with Sofia timezone
- One-click reply button

### Security Features
- **HTML sanitization**: Prevents XSS attacks in emails
- **Spam prevention**: Honeypot field + timing validation
- **Email validation**: Regex check on submission
- **Error handling**: Graceful fallback if email fails

## Monitoring & Logs

### View Sent Emails
1. Go to [Resend Logs](https://resend.com/emails)
2. See all sent emails
3. Check delivery status
4. View email content
5. Debug failed sends

### Webhook Setup (Optional)
For advanced monitoring, set up webhooks:

1. Go to [Webhooks](https://resend.com/webhooks)
2. Add endpoint: `https://mmartinov.com/api/webhook/resend`
3. Subscribe to events:
   - `email.sent`
   - `email.delivered`
   - `email.bounced`
   - `email.complained`

## Troubleshooting

### Email Not Sending

**Check API Key:**
```bash
# Verify env var is set
deno eval "console.log(Deno.env.get('RESEND_API_KEY'))"
```

**Check Domain Verification:**
- Visit Resend dashboard
- Ensure domain shows ✅ Verified
- Re-check DNS records if not verified

**Check Logs:**
```bash
# Server logs should show:
# "Contact form email sent successfully: { id: '...' }"

# Or error:
# "Resend API error: ..."
```

**Common Issues:**
- ❌ **API key not set**: Add to environment variables
- ❌ **Domain not verified**: Complete DNS verification
- ❌ **Wrong from address**: Use `website@mmartinov.com`
- ❌ **API key invalid**: Generate new key in dashboard

### Email Goes to Spam

**Solutions:**
1. **Add all DNS records** (especially DKIM)
2. **Verify SPF/DMARC** records are correct
3. **Warm up domain**: Start with low volume
4. **Avoid spam words**: Already handled in template
5. **Use verified domain**: Never send from @gmail.com

### Rate Limits

**Free Tier:**
- 3,000 emails/month
- 100 emails/day

**If You Hit Limits:**
- Upgrade to paid plan: $20/month for 50,000 emails
- Monitor usage in dashboard
- Set up alerts

## Best Practices

### 1. Keep API Key Secret
- ✅ Never commit to git
- ✅ Use environment variables only
- ✅ Rotate keys periodically
- ❌ Don't share in Slack/email
- ❌ Don't hardcode in source

### 2. Monitor Deliverability
- Check Resend dashboard weekly
- Review bounce/complaint rates
- Act on feedback quickly

### 3. Test Before Launch
- Send test emails to yourself
- Test from multiple devices
- Check spam folder
- Verify reply-to works

### 4. Handle Errors Gracefully
The code already:
- ✅ Logs errors to console
- ✅ Returns success to user even if email fails
- ✅ Prevents user frustration
- ✅ Notifies you of issues

## Cost Estimates

**Expected Usage:**
- ~5-10 contact forms per week
- ~20-40 emails per month
- **Well within free tier!**

**If High Traffic:**
| Plan | Emails/Month | Cost |
|------|-------------|------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20 |
| Scale | 500,000 | $100 |

## Alternative: Resend Domains

If you don't want to verify mmartinov.com:

1. Use Resend's free subdomain: `onboarding@resend.dev`
2. Update API code: `from: "Martin Martinov <onboarding@resend.dev>"`
3. Emails will work but look less professional

## Support

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: https://resend.com/support
- **Status Page**: https://status.resend.com

## Next Steps

After setup:
1. ✅ Send test email
2. ✅ Verify it arrives at me@mmartinov.com
3. ✅ Test reply-to functionality
4. ✅ Check spam folder (should not be there)
5. ✅ Monitor for first real submission

## Summary Checklist

- [ ] Created Resend account
- [ ] Generated API key
- [ ] Added domain mmartinov.com
- [ ] Configured DNS records
- [ ] Verified domain (✅ in dashboard)
- [ ] Added `RESEND_API_KEY` to environment
- [ ] Tested form submission locally
- [ ] Deployed to production
- [ ] Tested form on live site
- [ ] Confirmed email received

**You're all set! 🎉**

Contact form emails will now be delivered reliably to me@mmartinov.com with a professional appearance.
