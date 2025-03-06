import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Benefit {
  title: string;
  description: string;
}

export default function AboutUsPage() {
  const benefits: Benefit[] = [
    {
      title: 'Confidence and Independence',
      description:
        'Push biking helps children develop self-confidence and independence as they learn to navigate on their own.',
    },
    {
      title: 'Physical and Mental Development',
      description:
        'It builds balance, coordination, and strength while fostering problem-solving skills and resilience.',
    },
    {
      title: 'Gateway to Two-Wheeled Sports',
      description:
        'Push biking is a strong foundation for more advanced two-wheeled sports like BMX biking (an Olympic sport) and motorcycling.',
    },
    {
      title: 'Active Lifestyle and Less Screen Time',
      description:
        'It encourages children to step away from screens, promoting an active and healthy lifestyle at an early age.',
    },
    {
      title: 'Family and Community Bonding',
      description:
        'Our events bring families together in a fun and engaging environment that builds lasting memories and a sense of community.',
    },
  ];

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            About Kick2Pedal
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering young riders through push/run biking
          </p>
        </div>

        {/* Mission Statement */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              At Kick2Pedal, we are passionate about promoting push/run biking,
              a rapidly growing sport for children aged 2 to 12 years old. Push
              biking is one of the few sports where even a 2-year-old can
              independently participate, making it a unique and empowering
              experience for young children.
            </p>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            The Benefits of Push Biking
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <Card>
          <CardHeader>
            <CardTitle>Our Success Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We absolutely believe that push (balance) bikes are the best way
              to teach your kids how to bike. Our kids are a testimony that once
              the push bike is mastered, it will take less than 30 minutes for
              them to learn how to use a pedal bike!
            </p>
            <p>
              Our kids started on a balance bike as young as 20 months old!
              Learned how to pedal at 2.5 years old and still participate in
              balance/run bike races up to age 12.
            </p>
          </CardContent>
        </Card>

        {/* Community Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Growing Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              There is a HUGE push bike racing community in the country and its
              growing around the world too. We have kids participating in
              international races in Malaysia, Japan and Thailand!
            </p>
            <p>
              There are races almost every weekend in Metro Manila, Cebu,
              Bacolod, Pangasinan, Bulacan, Iloilo, Davao and its growing fast!
            </p>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-lg font-medium text-center">
              We are fully supporting this new sport as well as promoting grass
              roots initiatives to teach ALL kids how to bike! Biking is a
              wonderful exercise activity for kids and promotes outdoor play and
              is a GREAT Life Skill to have.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
