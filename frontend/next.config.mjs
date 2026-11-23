/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oqwzudnmcbovfyimyjtq.supabase.co',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      'sb_publishable_wvkmNjqmTEszCxDq3O2GTw_iDE29dzO',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'sb_publishable_wvkmNjqmTEszCxDq3O2GTw_iDE29dzO',
  },
};

export default nextConfig;
