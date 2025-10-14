/** @type {import('next').NextConfig} */
import withPWAinit from "next-pwa";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placebacon.net",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

const isDev = process.env.NODE_ENV !== "production";

const withPWA = withPWAinit({
  disable: isDev,
  dest: "public",
  // register: true,
  // skipWaiting: true,
  // disableDevLogs: true,
  exclude: [
    // add buildExcludes here
    ({ asset }) => {
      if (
        asset.name.startsWith("server/") ||
        asset.name.match(
          /^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/
        )
      ) {
        return true;
      }
      if (isDev && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    },
  ],
});

export default withPWA(nextConfig);
