import Link from "next/link";
import type React from "react";

// Field Manual design-system primitives. Shared building blocks so interior
// pages read in the same paper voice as the homepage: Instrument Serif display,
// IBM Plex Sans body, IBM Plex Mono labels, ink on #f4f1ea paper, purple accent.

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** 1120px content column with the standard responsive side padding. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("mx-auto max-w-[1120px] px-5 md:px-7 lg:px-10", className)}>
      {children}
    </div>
  );
}

/** Mono uppercase purple label sitting above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Instrument Serif heading. Defaults to an h2 at section scale. */
export function SerifHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cx(
        "font-[family-name:var(--font-instrument-serif)] tracking-[-0.02em]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Standard interior-page hero: eyebrow + large serif title + optional intro
 *  and actions, in the homepage's vertical rhythm. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#16130f]">
      <Container className="flex flex-col gap-6 py-16 lg:py-24">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <SerifHeading
          as="h1"
          className="max-w-[900px] text-[44px] leading-[1.0] md:text-[60px] lg:text-[72px]"
        >
          {title}
        </SerifHeading>
        {intro ? (
          <p className="max-w-[620px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty] md:text-[19px]">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-2 flex flex-col gap-3 sm:flex-row">{children}</div> : null}
      </Container>
    </section>
  );
}

type ButtonProps = {
  href: string;
  external?: boolean;
  variant?: "primary" | "outline" | "dark";
  className?: string;
  children: React.ReactNode;
};

const BUTTON_BASE =
  "inline-flex items-center justify-center px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";

const BUTTON_VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-[var(--kyx-purple)] text-[#f9f7f2] hover:bg-[#4f29a6]",
  outline: "border border-[#cec7b8] text-[#16130f] hover:border-[#16130f]",
  dark: "bg-[#16130f] text-[#f4f1ea] hover:bg-[#2c2820]",
};

/** No-radius mono button/link in the three Field Manual variants. */
export function Button({
  href,
  external,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const cls = cx(BUTTON_BASE, BUTTON_VARIANTS[variant], className);
  if (external || /^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Underlined text link in the accent style. */
export function TextLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cx(
    "border-b border-[var(--kyx-purple)] pb-0.5 text-[15px] text-[#16130f] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]",
    className
  );
  if (external || /^https?:/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
