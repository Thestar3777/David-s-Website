# Contact Form Setup Instructions

The "Book a Session" contact form on the `/train` page is now fully functional and will send emails when users submit training requests.

## Setup Steps

### 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the API key (it starts with `re_`)

### 2. Configure Environment Variables

Open the `.env.local` file in the root of your project and update these values:

```env
# Resend API Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Contact Email
CONTACT_EMAIL=your-email@example.com
```

Replace:
- `re_your_actual_api_key_here` with your actual Resend API key
- `your-email@example.com` with the email address where you want to receive training requests

### 3. Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain with Resend:

1. Go to the Domains section in your Resend dashboard
2. Add your domain and follow the DNS verification steps
3. Once verified, update the `from` field in `app/api/contact/route.ts`:

```typescript
from: 'Training Request <training@yourdomain.com>',
```

**Note:** For testing, you can use the default `onboarding@resend.dev` address, but it will only send emails to your own verified email address.

### 4. Restart the Development Server

After updating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## How It Works

1. User fills out the form with their name, email, and message
2. Form submits to `/api/contact` endpoint
3. The API route validates the data and sends an email via Resend
4. User sees a success or error message
5. You receive an email with the training request details

## Features

- ✅ Form validation (all fields required)
- ✅ Loading state while submitting
- ✅ Success message with auto-dismiss after 5 seconds
- ✅ Error handling with user-friendly messages
- ✅ Form reset after successful submission
- ✅ Disabled button during submission
- ✅ Beautiful HTML-formatted emails

## Testing

1. Navigate to `/train` page
2. Scroll to the "Book A Session" section
3. Fill out the form
4. Click "Send Message"
5. Check your email inbox for the training request

## Troubleshooting

**Email not sending?**
- Check that your `RESEND_API_KEY` is correct in `.env.local`
- Verify that your `CONTACT_EMAIL` is set
- Check the browser console and terminal for error messages
- Make sure you restarted the dev server after updating `.env.local`

**Getting 401 error?**
- Your Resend API key might be invalid or expired
- Generate a new API key from the Resend dashboard

**Emails going to spam?**
- Verify your domain in Resend
- Use a verified domain in the `from` field instead of `onboarding@resend.dev`
