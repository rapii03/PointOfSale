/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: '/api-backend/:path*',
				destination: `http://localhost:3001/api/:path*`,
			},
			{
				source: '/api/edgestore',
        		destination: `http://localhost:3001/edgestore`,
			},
		]
	},
}

module.exports = nextConfig
