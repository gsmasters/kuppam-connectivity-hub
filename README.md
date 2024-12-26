# Kuppam Connectivity Hub

Official website for the MPDO Office Kuppam, built with React, TypeScript, and Tailwind CSS.

## Development Setup

Requirements:
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn/ui
- Tailwind CSS
- Supabase

## Deployment

This project can be deployed to any static hosting service that supports Single Page Applications (SPAs). Here's how to deploy to Netlify:

1. Build the project locally:
```sh
npm run build
```

2. The built files will be in the `dist` directory.

3. Deploy to Netlify:
   - Sign up/login to [Netlify](https://www.netlify.com)
   - Drag and drop the `dist` folder to Netlify's dashboard
   - Or connect your GitHub repository for automatic deployments

## Environment Variables

Create a `.env` file in the root directory with your Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

MIT