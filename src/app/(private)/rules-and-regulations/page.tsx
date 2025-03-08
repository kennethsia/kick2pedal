import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RulesPage() {
  const rules = [
    {
      id: 1,
      title: 'Equipment',
      rules: [
        'Balance Bike size 12 inches only.',
        'All brands welcome!',
        'Every racer must have their own Balance Bike. Shared bikes are not allowed.',
        'Contestants must wear a safety helmet that meets safety standards.',
      ],
    },
    {
      id: 2,
      title: 'Starting Procedure',
      rules: [
        "The lane dividers are 2 meters apart. If a racer's wheels cross lanes within 2 meters, it is considered a foul.",
        "When beyond the 2 meter line, if changing lanes causes an accident to the competitor intentionally or unintentionally, it is considered a foul (subject to referee's discretion).",
        'If the front wheel is raised or lifted across the Start Gate before the start signal, it is considered a foul.',
      ],
    },
    {
      id: 3,
      title: 'Race Conduct',
      rules: [
        "Intentional clashing or use of body parts to cause harm to fellow athletes is considered a foul (subject to referee's discretion).",
        "Hitting more than three corners is considered a foul (subject to referee's discretion).",
      ],
    },
    {
      id: 4,
      title: 'Foul System',
      rules: [
        'First foul: Warning',
        'Second foul: Downgraded 3 places',
        'Third foul: Downgraded to last place',
        'Finals fouls:',
        '- First-time offenders: Downgraded 3 places',
        '- Repeat offenders: Downgraded to last place',
      ],
    },
    {
      id: 5,
      title: 'Additional Regulations',
      rules: [
        "Only competition organizers' cameras will be used for reviewing fouls.",
        'Conflicts, provocative behavior, or physical harm will result in immediate termination, 5-event ban, and ₱10,000 fine.',
        'Damages exceeding ₱10,000 will result in legal action.',
        'Non-payment of damages results in indefinite competition ban.',
        'Parents are restricted to designated areas at start and finish lines.',
        'All racers and parents must follow rules or face disqualification.',
        'The decision of the judging committee is final.',
      ],
    },
  ];

  const rules2 = [
    {
      id: 1,
      title: 'Team Composition',
      rules: [
        'Each team shall consist of one (1) participant for the 2-8 years old category.',
        'The participant must be the best rider representing their team in the said category.',
      ],
    },
    {
      id: 2,
      title: ' Scoring System',
      rules: [
        "Points will be awarded to each team based on their participant's finishing position in the individual category.",
        'The scoring system shall be as follows:',
        '1st place: 10 points',
        '2nd place: 8 points',
        '3rd place: 6 points',
        '4th place: 4 points',
        '5th place: 2 points',
      ],
    },
    {
      id: 3,
      title: 'Team Championship',
      rules: [
        'The team with the highest consolidated score at the end of the competition shall be declared the Team Champion.',
        'In the event of a tie, the team with the participant who achieved the fastest time in the individual category shall be declared the winner.',
      ],
    },
    {
      id: 4,
      title: 'General Rules',
      rules: [
        'All participants must adhere to the rules and regulations of the competition.',
        'The decision of the competition organizers and judges shall be final and binding.',
        'Any form of unsportsmanlike conduct or cheating shall result in disqualification and forfeiture of points.',
      ],
    },
    {
      id: 5,
      title: 'Penalties',
      rules: [
        'Any team found to have violated the rules and regulations of the competition shall be subject to penalties, including but not limited to:',
        'Deduction of points',
        'Disqualification from the competition',
      ],
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Rules and Regulations</h1>

      <div className="grid gap-6">
        {rules.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 ml-6">
                {section.rules.map((rule, index) => (
                  <li key={index} className="text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-sm text-muted-foreground text-center">
        Note: All rules are subject to referee interpretation and discretion
        where applicable.
      </div>

      <h1 className="text-3xl font-bold my-8">
        K2P Runbike Team Battle Rules and Regulations
      </h1>

      <div className="grid gap-6">
        {rules2.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 ml-6">
                {section.rules.map((rule, index) => (
                  <li key={index} className="text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-sm text-muted-foreground text-center">
        By participating in the team battle, all teams acknowledge that they
        have read, understood, and agreed to abide by these rules and
        regulations.
      </div>
    </div>
  );
}
