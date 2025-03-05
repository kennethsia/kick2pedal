import Navigation from '@/components/Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navigation />
      {children}
    </section>
  );
}
