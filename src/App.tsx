import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toaster from '@/components/Toaster';
import HomePage from '@/pages/HomePage';
import ToolsPage from '@/pages/ToolsPage';
import NotFoundPage from '@/pages/NotFoundPage';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const ImageCompressorPage = lazy(() => import('@/pages/tools/ImageCompressorPage'));
const ImageResizerPage = lazy(() => import('@/pages/tools/ImageResizerPage'));
const JpgToPngPage = lazy(() => import('@/pages/tools/JpgToPngPage'));
const PngToJpgPage = lazy(() => import('@/pages/tools/PngToJpgPage'));
const ImageToPdfPage = lazy(() => import('@/pages/tools/ImageToPdfPage'));
const MergePdfPage = lazy(() => import('@/pages/tools/MergePdfPage'));

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/image-compressor" element={<ImageCompressorPage />} />
                <Route path="/tools/image-resizer" element={<ImageResizerPage />} />
                <Route path="/tools/jpg-to-png" element={<JpgToPngPage />} />
                <Route path="/tools/png-to-jpg" element={<PngToJpgPage />} />
                <Route path="/tools/image-to-pdf" element={<ImageToPdfPage />} />
                <Route path="/tools/merge-pdf" element={<MergePdfPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
