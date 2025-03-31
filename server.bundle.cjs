const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/server/server.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/server/server.cjs',
    external: ['fs', 'path'],
    sourcemap: true,
}).catch(() => process.exit(1));
