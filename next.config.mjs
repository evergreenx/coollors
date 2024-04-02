/** @type {import('next').NextConfig} */


const nextConfig = {



    async headers() {
        return [{
            //cache all images, fonts, etc. in the public folder
            //Note: Next.js default is 'public, max-age=0' which cases many reloads on Safari!
            //Note: we use version hashes and therefore can use immutable
            source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|mp4|ttf|otf|woff|woff2)',
    
            headers: [{
                key: 'cache-control',
                value: 'public, max-age=31536000, immutable'
            }]
        }];
    }


    
};

export default nextConfig;
