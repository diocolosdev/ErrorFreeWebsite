# ErrorFree 24/7 IT Services Website

A professional IT services website with integrated Stripe payments for booking emergency support, computer upgrades, smart home installations, and premium website services.

## Features

- 24/7 Emergency IT Support booking
- Computer upgrade services (SSD, RAM, Gaming)
- Smart home and TV installation
- Premium website development services
- Business retainer plans (Bronze, Silver, Gold)
- Integrated Stripe payment processing
- Mobile-responsive design
- London & Liverpool coverage areas

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: Stripe
- **Build Tool**: Vite

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Add your Stripe publishable key to `.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

4. Start development server:
```bash
npm run dev
```

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized static files.

### Environment Variables

Create a `.env` file with:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
VITE_API_URL=https://your-api-domain.com
```

### Backend Requirements

For payment processing, you need a backend server to handle Stripe API calls securely. The included `public/server.js` provides a basic Express.js server example.

**Backend Environment Variables:**
```
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
PORT=3001
```

### Deployment Commands

1. **Install dependencies:**
```bash
npm install --production
```

2. **Build the application:**
```bash
npm run build
```

3. **Start with PM2:**
```bash
pm2 start ecosystem.config.js
```

### Nginx Configuration

Example Nginx config for serving the built application:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/errorfree247/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Payment Integration

The website includes a complete Stripe payment integration:

- **PaymentForm component**: Handles secure card collection
- **BookingWidget**: Multi-step booking process with payment
- **Stripe Elements**: Secure payment form components
- **Payment confirmation**: Success/error handling

### Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`

## Security Features

- SSL/TLS encryption required
- Stripe PCI compliance
- Secure payment processing
- No sensitive data stored in frontend
- Environment variable protection

## Support

For technical support or deployment assistance:
- Email: support@errorfree247.co.uk
- Phone: 07745432478 (24/7)