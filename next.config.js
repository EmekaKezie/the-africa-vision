/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.dog.ceo", "flagcdn.com", "upload.wikimedia.org"],
    },
    output: "standalone",

};
module.exports = nextConfig;