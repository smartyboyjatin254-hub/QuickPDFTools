import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermsPage() {
  const seo = useSeo({
    title: 'Terms of Service — QuickPDF Tools',
    description:
      'The terms governing your use of QuickPDF Tools. Read our terms of service for the rights, responsibilities, and acceptable use of our free toolkit.',
    canonical: 'https://quickpdftools.app/terms',
  });

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <article>
        <h1 className="section-title">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: August 2026</p>

        <div className="mt-8 space-y-8 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Acceptance of terms</h2>
            <p className="mt-2">By accessing or using QuickPDF Tools (“the Service”), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Description of service</h2>
            <p className="mt-2">QuickPDF Tools provides free, browser-based utilities for processing PDF and image files. All processing occurs locally in the user’s browser. The Service is provided “as is” without warranty of any kind.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Acceptable use</h2>
            <p className="mt-2">You agree to use the Service only for lawful purposes. You may not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Use the Service to process files you do not have the right to process.</li>
              <li>Attempt to disrupt, reverse-engineer, or overload the Service.</li>
              <li>Use automated scripts in a way that degrades the experience for others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Intellectual property</h2>
            <p className="mt-2">The Service name, branding, and code are owned by QuickPDF Tools. You retain all rights to the files you process — we claim no ownership over your content.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Limitation of liability</h2>
            <p className="mt-2">The Service is provided free of charge. To the maximum extent permitted by law, QuickPDF Tools shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service, including any loss of data. You are encouraged to keep backups of important files.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Third-party links and ads</h2>
            <p className="mt-2">The Service may display third-party advertisements or affiliate links. We are not responsible for the content or practices of third-party sites.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Changes to the Service and Terms</h2>
            <p className="mt-2">We may update or modify the Service and these Terms at any time. Continued use after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Contact</h2>
            <p className="mt-2">Questions about these terms? Email hello@quickpdftools.app.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
