export default function NewYorker() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          The New Yorker: A City in Transition (1974)
        </h2>
        <p className="mb-4">
          In 1974, The New Yorker published an in-depth examination of
          Louisville during a pivotal period of change. The article captured key
          insights about the city&apos;s self-perception and challenges that
          would shape its trajectory for decades to come.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Observations</h2>
        <div className="space-y-6">
          <div className="bg-background-300 text-foreground-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              The Atlanta Comparison
            </h3>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">
              &quot;In recent years they have seemed preoccupied, to a degree
              that might be called defensive, by comparisons with Atlanta. They
              like to point out that they think the bloom is off the capital
              city of Georgia.&quot;
            </blockquote>
          </div>

          <div className="bg-background-300 text-foreground-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">The Inertia Problem</h3>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">
              &quot;One of these Louisvillians, a young executive named H.
              Wendell Cherry, summed it all up by declaring that his city had
              fallen victim to an &apos;incredible inertia,&apos; which
              manifested itself in several ways, one of them being that a lot of
              citizens were going around saying they were glad that not much was
              happening in Louisville.&quot;
            </blockquote>
          </div>

          <div className="bg-background-300 text-foreground-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Economic Identity Crisis
            </h3>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">
              &quot;Blue-collar industry and blue-collar workers were unlikely
              to make the sort of contributions to the community that some of
              the community&apos;s leaders thought ought to be made. Blue-collar
              industry, they reasoned, meant an orientation toward suburbia
              rather than the central city and many of these leaders were
              worried about what was happening to the center of Louisville. The
              downtown section was deteriorating, and the people were expressing
              fear that it would continue to deteriorate.&quot;
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
