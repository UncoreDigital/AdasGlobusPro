import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Target, UserRound } from "lucide-react";
import CountryCode from "@/components/CountryCode";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import EngagementModels from "@/components/sections/EngagementModels";
import Workflow from "@/components/sections/Workflow";
import { about, boundary, team } from "@/lib/content";
import { figure, getSettings } from "@/lib/settings";
import { features, offices, site } from "@/lib/site";
import { fadeLeft, fadeRight } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Who We Are — Offshore Accounting Built for U.S. Firms",
  description:
    "ADAS Globus Pro was founded in 2020 by three Chartered Accountants to give U.S. CPA firms offshore capacity that arrives ready to review. Our story, vision, mission and values.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSettings();

  /*
    Two of the fact-strip figures are also printed on the homepage, so they are
    read from settings rather than hard-coded here — the same number cannot end
    up different on two pages.
  */
  const facts = about.facts.map((fact) =>
    fact.label === "Accounting professionals"
      ? { ...fact, value: figure(settings.employees) }
      : fact.label === "Transactions processed monthly"
        ? { ...fact, value: figure(settings.transactions) }
        : fact
  );

  return (
    <>
      <PageBanner
        eyebrow="Who We Are"
        title={about.heading}
        lead={about.lead}
        breadcrumbs={[{ name: "Who We Are" }]}
      />

      {/* Fact strip */}
      <section className="border-b border-border bg-white py-12">
        <div className="container">
          <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {facts.map((fact) => (
              <RevealItem key={fact.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-gradient-brand">
                  {fact.value}
                </p>
                <p className="mt-2 text-[12.5px] leading-snug text-ink-muted">{fact.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal variants={fadeRight} className="order-2 lg:order-1">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-lift">
                  <Image
                    src="/assets/photos/handshake-city.webp"
                    alt=""
                    width={568}
                    height={492}
                    aria-hidden="true"
                    className="w-full object-cover"
                  />
                </div>
                {/* Founding-year plate, overlapping the image corner. */}
                <div className="absolute -bottom-6 -right-4 rounded-xl border border-border bg-white px-6 py-4 shadow-card sm:-right-6">
                  <p className="font-display text-3xl font-extrabold text-gradient-accent">2020</p>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Founded
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow={about.story.eyebrow}
                title="Started by Chartered Accountants"
                accent="Who Had Done the Work"
              />
              <div className="mt-7 space-y-5">
                {about.story.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15.5px] leading-[1.8] text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Reveal variants={fadeLeft} className="mt-8">
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand hover:text-brand-light"
                >
                  Meet the people who lead each practice
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { ...about.vision, Icon: Compass },
              { ...about.mission, Icon: Target },
            ].map(({ heading, body, Icon }) => (
              <Reveal
                key={heading}
                className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 sm:p-10"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundImage: "var(--gradient-accent-x)" }}
                  aria-hidden="true"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold text-navy-deep">{heading}</h2>
                <p className="mt-4 text-[15.5px] leading-[1.8] text-ink-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Core Values"
            title="Ten Principles That Govern"
            accent="Every Engagement"
            lead="Values are only worth publishing if they change a decision. Each of these has a line explaining what it actually means in practice."
            onDark
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((value, i) => (
              <RevealItem
                key={value.name}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-display text-[13px] font-extrabold text-accent-light"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[14.5px] font-bold text-white">{value.name}</h3>
                </div>
                <p className="mt-2.5 pl-8 text-[13px] leading-relaxed text-white/60">
                  {value.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Leadership teaser — the full page is /team */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title={features.leadershipProfiles ? "The People Who" : "Practice Areas,"}
            accent={
              features.leadershipProfiles ? "Run the Firm" : "Managing Directors"
            }
            align="center"
          />
          {/*
            A teaser, so it stays a row of faces and names — the bios are on
            /team and repeating them here would make two pages say the same
            thing. Falls back to practice-area cards when
            features.leadershipProfiles is off; see the note on /team.

            Wrapped flex, matching /team — a grid pins a short final row to the
            left-hand columns and leaves a hole beside it. justify-center keeps
            the last row centred whoever is on it.
          */}
          <RevealGroup className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-5">
            {team.leadership.map((leader) => (
              <RevealItem
                key={leader.name}
                className="w-[calc(50%-0.625rem)] sm:w-[calc(33.333%-0.834rem)] lg:w-[calc(20%-1rem)]"
              >
                <Link
                  href="/team"
                  className="card-edge group flex h-full flex-col items-center overflow-hidden text-center transition-transform hover:-translate-y-1"
                >
                  {features.leadershipProfiles ? (
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={leader.photo}
                        alt={`${leader.name}, ${leader.role} at ${site.name}`}
                        fill
                        sizes="(min-width: 1024px) 12rem, (min-width: 640px) 30vw, 45vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <span
                      className="mt-7 flex h-14 w-14 items-center justify-center rounded-xl text-white"
                      style={{ backgroundImage: "var(--gradient-brand)" }}
                      aria-hidden="true"
                    >
                      <UserRound className="h-6 w-6" />
                    </span>
                  )}

                  <div className="p-5">
                    <h3 className="text-[14px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
                      {features.leadershipProfiles ? leader.name : leader.focus}
                    </h3>
                    <p className="mt-1 text-[12px] text-ink-muted">{leader.role}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-brand hover:text-brand-light"
            >
              See the full team, bench depth and review layers
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <EngagementModels />
      <Workflow />

      {/* Offices */}
      <section className="section-tight bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Where We Are"
            title="A U.S. Office and"
            accent="Two Delivery Centres"
            lead="We name where the work happens rather than leaving you to ask. It is the first question on almost every discovery call."
            align="center"
          />
          <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <RevealItem
                key={office.id}
                className="rounded-xl border border-border bg-white p-7"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-dark">
                  {office.role}
                </p>
                <h3 className="mt-2.5 flex items-center gap-2.5 text-[15px] font-bold text-navy-deep">
                  <CountryCode code={office.code} />
                  {office.city}
                </h3>
                <p className="mt-3.5 text-[14px] leading-relaxed text-ink-muted">
                  {office.address}
                </p>
                <a
                  href={office.phoneHref}
                  className="mt-3 inline-block text-[14px] font-semibold text-brand hover:text-brand-light"
                >
                  {office.phone}
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-12 max-w-3xl rounded-xl border border-border bg-white p-6">
            <p className="text-[13px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-navy-deep">Scope of practice.</strong>{" "}
              {boundary}
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${site.url}/about`,
          mainEntity: {
            "@id": `${site.url}/#organization`,
            "@type": "Organization",
            name: site.name,
            foundingDate: String(site.founded),
            /* Mirrors /team — see the note there. */
            ...(features.leadershipProfiles
              ? {
                  employee: team.leadership.map((leader) => ({
                    "@type": "Person",
                    name: leader.name,
                    jobTitle: leader.role,
                    image: `${site.url}${leader.photo}`,
                  })),
                }
              : {}),
            knowsAbout: team.leadership.map((leader) => leader.focus),
          },
        }}
      />
    </>
  );
}
