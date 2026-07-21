"use client";

import Link from "next/link";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Show, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import {
  Activity,
  CalendarClock,
  ClipboardList,
  FlaskConical,
  Pill,
  Users,
  BedDouble,
  Building2,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

// ---------------------------------------------------------------------------
// Signature element: an ECG / vitals pulse line used as a section divider.
// It's a real reference to the domain (patient monitoring) rather than a
// decorative gradient rule, and it quietly animates on load.
// ---------------------------------------------------------------------------



function PulseDivider({ className = "" }: { className?: string }) {
  
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10">
        <path
          d="M0,30 L260,30 L290,30 L305,6 L322,54 L338,30 L360,30 L900,30 L918,14 L934,46 L950,30 L1200,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pulse-path text-[#FF5A5F]"
        />
      </svg>
      <style jsx>{`
        .pulse-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: draw-pulse 2.4s ease-out forwards;
        }
        @keyframes draw-pulse {
          to {
            stroke-dashoffset: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-path {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

const vitals = [
  { label: "Facilities on Wardline", value: "2,140+", unit: "orgs" },
  { label: "Avg. claim turnaround", value: "38%", unit: "faster" },
  { label: "Uptime, last 12 months", value: "99.98", unit: "%" },
  { label: "Records migrated", value: "6.2M", unit: "charts" },
];

const features = [
  {
    icon: BedDouble,
    title: "Bed & ward tracking",
    body: "See every bed's status in real time — occupied, cleaning, or ready — across every ward and building.",
  },
  {
    icon: CalendarClock,
    title: "Scheduling & shifts",
    body: "Build staff rosters, manage on-call rotations, and let patients book appointments without a phone call.",
  },
  {
    icon: ClipboardList,
    title: "Electronic patient records",
    body: "One chart per patient, shared across departments, with a full history of visits, notes, and prescriptions.",
  },
  {
    icon: Pill,
    title: "Pharmacy & inventory",
    body: "Track stock down to the unit, get low-stock alerts, and reorder supplies before a shelf runs empty.",
  },
  {
    icon: FlaskConical,
    title: "Lab & diagnostics",
    body: "Route lab orders, log results against the right chart, and flag critical values the moment they land.",
  },
  {
    icon: Activity,
    title: "Billing & insurance claims",
    body: "Generate invoices, submit claims, and reconcile payments without leaving the platform.",
  },
];

const plans = [
  {
    id: "clinic",
    icon: Stethoscope,
    name: "Clinic",
    tagline: "For independent practices and small teams",
    price: "$49",
    cadence: "/ month, per location",
    highlights: [
      "Up to 8 staff accounts",
      "One clinic location, one branch",
      "Appointment booking & reminders",
      "Patient records & e-prescriptions",
      "Billing for a single location",
    ],
    cta: "Start with Clinic",
    href: "/subscribe?plan=clinic_monthly",
    accent: false,
  },
  {
    id: "clinic-yearly",
    icon: Stethoscope,
    name: "Clinic",
    tagline: "For independent practices and small teams",
    price: "$480",
    cadence: "/ year, per location",
    highlights: [
      "Up to 8 staff accounts",
      "One clinic location, one branch",
      "Appointment booking & reminders",
      "Patient records & e-prescriptions",
      "Billing for a single location",
    ],
    cta: "Start with Clinic",
    href: "/subscribe?plan=clinic_yearly",
    accent: false,
  },
  {
    id: "hospital",
    icon: Building2,
    name: "Hospital",
    tagline: "For multi-department and multi-ward facilities",
    price: "$249",
    cadence: "/ month, per facility",
    highlights: [
      "Unlimited staff accounts",
      "One hospital location, multiple branches",
      "Ward, bed & department management",
      "Lab, pharmacy & radiology modules",
      "Insurance claims & multi-branch billing",
    ],
    cta: "Start with Hospital",
    href: "/subscribe?plan=hospital_monthly",
    accent: true,
  },
  {
    id: "hospital-yearly",
    icon: Building2,
    name: "Hospital",
    tagline: "For multi-department and multi-ward facilities",
    price: "$2880",
    cadence: "/ year, per facility",
    highlights: [
      "Unlimited staff accounts",
      "One hospital location, multiple branches",
      "Ward, bed & department management",
      "Lab, pharmacy & radiology modules",
      "Insurance claims & multi-branch billing",
    ],
    cta: "Start with Hospital",
    href: "/subscribe?plan=hospital_yearly",
    accent: true,
  },
];

export default function LandingPage() {
  const { user } = useUser();

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#FAFAF8] text-[#14171A]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Nav                                                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[#E4E6E8] bg-[#FAFAF8]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1B2A4A] text-[#FAFAF8]"
              aria-hidden="true"
            >
              <Activity className="h-4 w-4" />
            </span>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Wardline
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#4B5259] md:flex">
            <a href="#features" className="hover:text-[#1B2A4A]">
              Features
            </a>
            <a href="#plans" className="hover:text-[#1B2A4A]">
              Plans
            </a>
            <a href="#faq" className="hover:text-[#1B2A4A]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
              <button
                className="hidden text-sm font-medium text-[#4B5259] hover:text-[#1B2A4A] sm:block"
              >
                Sign in
            </button>
              </SignInButton>

            </Show>
            <Show when="signed-in">
              <UserButton />
              <span>{user?.firstName}</span>
            </Show>
            <Link
              href="#plans"
              className="rounded-md bg-[#1B2A4A] px-4 py-2 text-sm font-semibold text-[#FAFAF8] transition-colors hover:bg-[#14213B]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-6 sm:pt-24">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E4E6E8] bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#4B5259]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7A9B8E]" />
          Operating system for care teams
        </div>

        <h1
          className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Run every ward, every shift, every claim — from one dashboard.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4B5259]">
          Wardline replaces the spreadsheets, whiteboards, and paper charts
          your clinic or hospital runs on today. Create an account, pick a
          plan for your clinic or your hospital, and bring your whole
          operation online in an afternoon.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#plans"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A5F] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            View subscription plans
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#D8DBDD] bg-white px-6 py-3.5 text-sm font-semibold text-[#14171A] transition-colors hover:bg-[#F1F0EB]"
          >
            See what&apos;s included
          </a>
        </div>

        <PulseDivider className="mt-16 text-[#D8DBDD]" />

        {/* Vitals-style stat readout */}
        <dl className="mt-2 grid grid-cols-2 gap-8 border-t border-[#E4E6E8] pt-8 sm:grid-cols-4">
          {vitals.map((v) => (
            <div key={v.label}>
              <dt className="text-xs uppercase tracking-wider text-[#8A9096]">{v.label}</dt>
              <dd className="mt-1 flex items-baseline gap-1">
                <span
                  className="text-2xl font-semibold text-[#1B2A4A] sm:text-3xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {v.value}
                </span>
                <span className="text-xs text-[#8A9096]">{v.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything a front desk, a ward, and a billing office need in common.
          </h2>
          <p className="mt-4 text-[#4B5259]">
            Each module works on its own or together — start with what your
            team needs today and turn on the rest as you grow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E4E6E8] bg-[#E4E6E8] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-[#FAFAF8] p-7">
              <f.icon className="h-5 w-5 text-[#FF5A5F]" strokeWidth={2} />
              <h3
                className="mt-4 text-base font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5259]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <PulseDivider className="mx-auto max-w-6xl px-6 text-[#D8DBDD]" />

      {/* ---------------------------------------------------------------- */}
      {/* Plans — the required entry point into subscription, split by      */}
      {/* clinic vs hospital.                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="plans" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose the plan that matches your facility.
          </h2>
          <p className="mt-4 text-[#4B5259]">
            Both plans include a 14-day free trial. Switch or cancel anytime
            from your account settings.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-xl border p-8 ${
                plan.accent
                  ? "border-[#1B2A4A] bg-[#1B2A4A] text-[#FAFAF8]"
                  : "border-[#E4E6E8] bg-white text-[#14171A]"
              }`}
            >
              {plan.accent && (
                <span
                  className="absolute -top-3 left-8 rounded-full bg-[#FF5A5F] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Most facilities
                </span>
              )}

              <div className="flex items-center gap-2">
                <plan.icon
                  className={`h-5 w-5 ${plan.accent ? "text-[#FF5A5F]" : "text-[#FF5A5F]"}`}
                />
                <span
                  className="text-sm font-medium uppercase tracking-wider opacity-70"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {plan.name}
                </span>
              </div>

              <p className={`mt-3 text-sm ${plan.accent ? "text-[#C9D0DC]" : "text-[#4B5259]"}`}>
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.accent ? "text-[#C9D0DC]" : "text-[#8A9096]"}`}>
                  {plan.cadence}
                </span>
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.accent ? "text-[#7A9B8E]" : "text-[#7A9B8E]"
                      }`}
                    />
                    <span className={plan.accent ? "text-[#E4E8EF]" : "text-[#333A40]"}>{h}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  plan.accent
                    ? "bg-[#FF5A5F] text-white"
                    : "bg-[#1B2A4A] text-[#FAFAF8]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-[#8A9096]">
          <ShieldCheck className="h-4 w-4" />
          Not sure which fits? You can start on Clinic and move to Hospital as
          you add departments — nothing is lost in the switch.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-xl border border-[#E4E6E8] bg-white px-8 py-14 text-center sm:px-16">
          <Users className="mx-auto h-6 w-6 text-[#FF5A5F]" />
          <h2
            className="mx-auto mt-4 max-w-lg text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create your account and pick a plan in under five minutes.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#plans"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF5A5F] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View subscription plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[#E4E6E8]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[#8A9096] sm:flex-row">
          <span>© {new Date().getFullYear()} Wardline. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#1B2A4A]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#1B2A4A]">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#1B2A4A]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}