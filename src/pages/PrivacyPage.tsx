import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPage() {
  const seo = useSeo({
    title: 'Privacy Policy — QuickPDF Tools',
    description:
      'QuickPDF Tools processes all files locally in your browser. Read our full privacy policy to understand how we handle data and protect your privacy.',
    canonical: 'https://quickpdftools.app/privacy-policy',
  });

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <article className="prose-quick">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: August 2026</p>

        <div className="mt-8 space-y-8 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">The short version</h2>
            <p className="mt-2">
              <strong>Your files never leave your device.</strong> All processing — compression, conversion, resizing, merging — happens entirely in your browser using JavaScript and WebAssembly. We do not upload, store, or transmit your files to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Information we collect</h2>
            <p className="mt-2">We collect minimal, anonymized data necessary to operate and improve the service:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><strong>Usage analytics:</strong> Aggregated, anonymized page views and tool usage to understand which tools are popular.</li>
              <li><strong>Technical data:</strong> Browser type and device category, used for compatibility improvements.</li>
              <li><strong>Contact form:</strong> If you email us, we retain your message to respond and improve support.</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> collect the content of files you process, your name (unless you provide it), or sell data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Cookies and local storage</h2>
            <p className="mt-2">We use local storage to remember your theme (light or dark) preference. We do not use tracking cookies. If we add analytics in the future, they will be privacy-respecting and anonymized.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Third-party services</h2>
            <p className="mt-2">We may display advertising (such as Google AdSense) and affiliate recommendations in the future. These third parties may use cookies subject to their own privacy policies. We will never allow them access to your files.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your rights</h2>
            <p className="mt-2">You can request access to, correction of, or deletion of any personal data we hold about you (primarily contact form submissions). Contact us at hello@quickpdftools.app to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security</h2>
            <p className="mt-2">Because files are processed locally, the risk of file data exposure is minimal by design. Our website is served over HTTPS. We validate file types and sizes at the browser level to prevent abuse.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Changes to this policy</h2>
            <p className="mt-2">We may update this policy as the service evolves. Material changes will be reflected in the “Last updated” date above.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Contact</h2>
            <p className="mt-2">Questions about privacy? Email hello@quickpdftools.app.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
