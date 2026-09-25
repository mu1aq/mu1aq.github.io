// Runs only after a SUCCESSFUL `astro build` (chained with && in package.json).
// Astro builds into blog-src/dist (gitignored); this copies that fresh output
// into the committed ../blog. Because it runs only on success, a failed build
// can never wipe the published site. It also encrypts password-locked posts,
// strips inert content-layer artifacts and writes the repo-root .nojekyll.
import { rm, cp, writeFile, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url); // blog-src/dist
const out = new URL('../../blog/', import.meta.url); // repo/blog
const strays = ['content-modules.mjs', 'content-assets.mjs', 'collections', 'data-store.json', 'settings.json'];
const ITER = 600_000; // PBKDF2-SHA256 rounds (OWASP 2023); stored per post, so raising it is safe

// strip inert content-layer files Astro emits into the output root
// (data-store.json holds every post body in plaintext, locked ones included)
for (const name of strays) {
  await rm(new URL(name, dist), { recursive: true, force: true });
}

// ---- encrypt locked posts (Locked.astro left their body in data-lock-plain) ----
const files = (await readdir(dist, { recursive: true, withFileTypes: true }))
  .filter((e) => e.isFile())
  .map((e) => `${e.parentPath}/${e.name}`);
const mime = { webp: 'image/webp', avif: 'image/avif', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml' };
const inlined = new Set();

async function encrypt(password, text) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const pw = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
    pw, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
  );
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(text)));
  return Buffer.concat([salt, iv, ct]).toString('base64'); // layout Locked.astro expects
}

for (const f of files.filter((f) => f.endsWith('.html'))) {
  const page = await readFile(f, 'utf8');
  const m = page.match(/data-lock-plain="([^"]*)"/);
  if (!m) continue;
  let { password, html } = JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'));
  // images would otherwise sit in the public _astro/ folder — embed them in the ciphertext
  const refs = new Set(html.match(/\/blog\/_astro\/[^"'\s,)]+\.(?:webp|avif|png|jpe?g|gif|svg)/g) ?? []);
  for (const ref of refs) {
    const name = ref.slice('/blog/_astro/'.length);
    const data = await readFile(new URL(`_astro/${name}`, dist));
    html = html.replaceAll(ref, `data:${mime[name.split('.').pop()]};base64,${data.toString('base64')}`);
    inlined.add(name);
  }
  const sealed = await encrypt(password, html);
  await writeFile(f, page.replace(m[0], `data-lock="${sealed}" data-iter="${ITER}"`));
  console.log(`postbuild: encrypted ${f}`);
}

// drop the inlined images unless a public page (e.g. a cover) still uses them
const texts = await Promise.all(files.filter((f) => /\.(html|css|js)$/.test(f)).map((f) => readFile(f, 'utf8')));
for (const name of inlined) {
  if (!texts.some((t) => t.includes(name))) await rm(new URL(`_astro/${name}`, dist));
}

// fail closed: never publish a page whose plaintext marker survived
if (texts.some((t) => t.includes('data-lock-plain'))) {
  throw new Error('postbuild: a locked post was left unencrypted — blog/ not updated');
}

// replace the committed blog/ with the fresh build
await rm(out, { recursive: true, force: true });
await cp(dist, out, { recursive: true });

// repo-root .nojekyll so Pages serves the _astro/ assets
await writeFile(new URL('../.nojekyll', out), '');

console.log('postbuild: copied dist -> blog, stripped strays, wrote .nojekyll');
console.log('  output:', fileURLToPath(out));
