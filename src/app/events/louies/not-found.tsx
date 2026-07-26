import { Container, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

export default function NotFound() {
  return (
    <section>
      <Container className="flex flex-col items-start gap-6 py-24 lg:py-32">
        <Eyebrow>404 — wrong party</Eyebrow>
        <SerifHeading
          as="h1"
          className="max-w-[720px] text-[40px] leading-[1.0] md:text-[56px]"
        >
          Oops! Did someone say party?
        </SerifHeading>
        <p className="max-w-[620px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          Well, this is awkward... Looks like you&apos;re trying to crash a
          party that doesn&apos;t exist! Did you time travel to the wrong year?
          Or maybe you&apos;ve had one too many Kentucky bourbons? Don&apos;t
          worry, we won&apos;t tell anyone — let&apos;s get you to the right
          celebration! 🥃
        </p>
        <Button href="/louies/2025" variant="primary">
          Take me to the real party
        </Button>
      </Container>
    </section>
  );
}
