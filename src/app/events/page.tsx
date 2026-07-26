import { Container, PageHero, Button } from "@/app/components/fm";

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Vote with your feet."
        intro="Events are open to all. We encourage you to show up."
      >
        <Button href="https://lu.ma/kycombinator" variant="primary">
          View all events
        </Button>
      </PageHero>

      <section>
        <Container className="py-16 lg:py-[72px]">
          <div className="border border-[#d8d2c5] bg-[#eae5da] p-3 md:p-5">
            <iframe
              src="https://lu.ma/embed/calendar/cal-gyukdJFBvrxa0BO/events"
              width="100%"
              height="100%"
              className="min-h-[450px] w-full"
              allowFullScreen={true}
              aria-hidden="false"
            ></iframe>
          </div>
        </Container>
      </section>
    </>
  );
}
