import type { Metadata } from "next";
import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import { team } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { figure, getSettings } from "@/lib/settings";
import { features, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team — Leadership, Bench Depth and Review Layers",
  description:
    "The Chartered Accountants and Directors who lead ADAS Globus Pro, how the delivery team is structured by grade, and the three layers of review every deliverable passes before it reaches your firm.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const settings = await getSettings();

  return (
    <>
      <PageBanner
        eyebrow="Our Team"
        title={team.hero.heading}
        lead={team.hero.lead}
        breadcrumbs={[{ name: "Who We Are", href: "/about" }, { name: "Our Team" }]}
      />

      {/* Leadership */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title={
              features.leadershipProfiles
                ? "The People Who Set"
                : "Practice Areas, Each Led by"
            }
            accent={
              features.leadershipProfiles ? "the Standard" : "a Chartered Accountant"
            }
            lead="Chartered Accountants leading the practice areas they spent their careers in, and Directors running delivery and client relationships."
            align="center"
          />

          {/*
            Two renderings of the same data, chosen by features.leadershipProfiles.

            With profiles on, the cards are portraits: photograph, name, role.
            With them off they fall back to a practice-area icon and no
            identification — the structural claim a prospect is evaluating
            survives the anonymity, which is what made the flag safe to ship in
            the first place.

            The "Chartered Accountant" line used to be hardcoded onto every
            card. That was true of three people and stopped being true when two
            Directors joined the list, so it now reads from `leader.chartered`.
          */}
          {/*
            Three across, so five people land as 3 + 2 rather than 4 + 1 with an
            orphan. The row order is the array order in lib/content.ts — the two
            Directors first, then the three Chartered Accountants.

            Wrapped flex rather than a grid, because a grid pins the last row to
            the left-hand columns: five cards in three columns left Devarshi and
            Arpit hard against the left with a card-sized hole beside them.
            justify-center pushes any short final row to the middle, and it keeps
            doing so if somebody joins or leaves — which a grid's explicit
            column-start offsets would not.

            The widths subtract their share of the 1.5rem gap so the rows still
            break at two and three across.
          */}
          <RevealGroup className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-6">
            {team.leadership.map((leader) => {
              const AreaIcon = getIcon(leader.icon);
              return (
                <RevealItem
                  key={leader.name}
                  className="card-edge group flex w-full flex-col overflow-hidden text-center transition-transform hover:-translate-y-1.5 hover:shadow-lift sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  {features.leadershipProfiles ? (
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={leader.photo}
                        alt={`${leader.name}, ${leader.role} at ${site.name}`}
                        fill
                        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Foot ramp, so the name sits on a settled tone rather
                          than on whatever the photograph happens to end on. */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <span
                      className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundImage: "var(--gradient-brand)" }}
                    >
                      <AreaIcon className="h-7 w-7" aria-hidden="true" />
                    </span>
                  )}

                  <div className="flex flex-1 flex-col p-8 pt-5">
                    <h3 className="text-[17px] font-bold leading-snug text-navy-deep">
                      {features.leadershipProfiles ? leader.name : leader.focus}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-semibold text-brand">
                      {leader.role}
                    </p>
                    {features.leadershipProfiles && (
                      <p className="mt-1 text-[12.5px] text-ink-muted">{leader.focus}</p>
                    )}

                    <p className="mt-5 flex-1 border-t border-border pt-5 text-[14px] leading-[1.7] text-ink-muted">
                      {leader.bio}
                    </p>

                    {leader.chartered && (
                      <p className="mt-5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent-dark">
                        Chartered Accountant
                      </p>
                    )}
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/*
        Delivery floor. Sits between the leadership portraits and the bench numbers
        because that is exactly where the reader is asking "yes, but is there
        anyone behind those three?" — a candid operational shot answers it
        faster than the figures underneath do. Deliberately not a posed team
        photo: the leadership headshots are the portraits on this page.
      */}
      <section className="relative bg-navy-deep">
        <div className="container">
          <Reveal className="relative -mb-px overflow-hidden rounded-t-2xl">
            <Image
              src="/assets/photos/team-floor.webp"
              alt="The ADAS Globus Pro delivery floor, with accounting professionals at work"
              width={1536}
              height={1024}
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="h-[16rem] w-full object-cover object-center sm:h-[22rem]"
            />
            {/* Foot ramp, so the photograph resolves into the navy band below
                rather than stopping at a hard edge. */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-deep to-transparent"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>

      {/* Bench depth */}
      <section className="section relative overflow-hidden bg-navy-deep pt-12 lg:pt-16">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Bench Depth"
                title="A Structured Team,"
                accent="Not a Solo Preparer"
                lead="Capacity that survives leave, illness and a busy season needs grades above and below the person doing the work. Here is how the bench is organised."
                onDark
              />

              <RevealGroup className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { value: figure(settings.employees), label: "Accounting professionals" },
                  { value: "3", label: "Review layers before delivery" },
                  { value: figure(settings.transactions), label: "Transactions monthly" },
                  { value: figure(settings.experience), label: "Years combined leadership" },
                ].map((stat) => (
                  <RevealItem
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center"
                  >
                    <p className="font-display text-2xl font-extrabold text-accent-light sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-snug text-white/55">{stat.label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <RevealGroup className="space-y-4">
              {team.composition.map((grade, i) => (
                <RevealItem
                  key={grade.grade}
                  className="flex gap-5 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <span
                    className="font-display text-[13px] font-extrabold text-accent-light"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{grade.grade}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">
                      {grade.detail}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Review layers */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="How Work Is Reviewed"
            title="Four Sets of Eyes."
            accent="Yours Is the Last."
            lead="Every deliverable clears three internal layers before it reaches your firm — and your reviewer still holds the judgement and the sign-off."
            align="center"
          />

          <div className="relative mt-14">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(var(--brand) / 0.25), hsl(var(--accent) / 0.5))",
              }}
              aria-hidden="true"
            />

            <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {team.reviewLayers.map((layer, i) => {
                const isClient = i === team.reviewLayers.length - 1;
                return (
                  <RevealItem key={layer.step} className="relative text-center lg:px-3">
                    <span
                      className={`relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white font-display text-lg font-extrabold shadow-brand ${
                        isClient ? "text-navy-deep" : "text-white"
                      }`}
                      style={{
                        backgroundImage: isClient
                          ? "var(--gradient-accent-x)"
                          : "var(--gradient-brand)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[15.5px] font-bold text-navy-deep">{layer.step}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.7] text-ink-muted">
                      {layer.body}
                    </p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-tight bg-slate-50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
            <Reveal>
              <span className="eyebrow mb-4">Standards</span>
              <h2 className="text-[1.6rem] font-extrabold leading-tight text-navy-deep sm:text-[2rem]">
                What the Team Is Held To
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink-muted">
                Credentials matter less than what they are applied to. These are the
                standards our professionals are trained on and reviewed against, and the
                controls that govern how they handle your clients&apos; data.
              </p>
              <div className="mt-7 inline-flex items-center gap-3.5 rounded-xl border border-emerald/25 bg-emerald/5 px-5 py-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
                <p className="text-[13.5px] leading-snug text-navy-deep">
                  Every professional on your engagement signs an individual confidentiality
                  agreement before access is provisioned.
                </p>
              </div>
            </Reveal>

            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {team.credentials.map((credential) => (
                <RevealItem
                  key={credential}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 transition-colors hover:border-accent/50"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                  <span className="text-[14px] font-medium leading-snug text-navy-deep">
                    {credential}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Our Team",
          url: `${site.url}/team`,
          mainEntity: {
            "@id": `${site.url}/#organization`,
            "@type": "Organization",
            name: site.name,
            /* Person entries track features.leadershipProfiles — structured
               data is published content, so naming people here while the page
               hides them would undo the point of the flag. */
            ...(features.leadershipProfiles
              ? {
                  employee: team.leadership.map((leader) => ({
                    "@type": "Person",
                    name: leader.name,
                    jobTitle: leader.role,
                    image: `${site.url}${leader.photo}`,
                    knowsAbout: leader.focus,
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
