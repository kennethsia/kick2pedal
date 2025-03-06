import Navigation from '@/components/Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navigation />
      <div className="min-h-screen p-8">
        <main className="max-w-4xl mx-auto">{children}</main>
      </div>
    </section>
  );
}
