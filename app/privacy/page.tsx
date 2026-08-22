import type { Metadata } from "next";
import { PageShell, P, H2, C } from "../components/PageShell";

export const metadata: Metadata = {
  title: "Privacy — Dr. Rushindra Sinha",
  description:
    "What rushindra.com collects and does not collect: cookieless analytics, a local theme preference, no accounts, no forms, no data sold.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy — Dr. Rushindra Sinha",
    description: "Privacy policy for rushindra.com.",
    url: "https://rushindra.com/privacy",
    type: "website",
  },
};

const EMAIL = "rushindra@globalesports.com";
const UPDATED = "22 August 2026";

export default function PrivacyPage() {
  return (
    <PageShell label="Privacy" title="What this site collects.">
      <P>
        rushindra.com is a personal website. It has no accounts, no login, no
        newsletter signup, no comment system, and no contact form. It does not ask
        you for personal information, because there is nowhere on this site to enter
        any. This policy describes the small amount of data that is handled anyway,
        simply as a consequence of the site being served over the internet.
      </P>

      <H2>Analytics</H2>
      <P>
        This site uses Vercel Web Analytics to count page views. It is cookieless
        and does not track individuals: it records aggregate events such as the page
        visited, referrer, approximate country, browser, and device type. It does not
        build a profile of you, does not follow you across other websites, and does
        not use device fingerprinting for advertising. There are no advertising
        trackers, no Google Analytics, no Meta pixel, and no third-party ad networks
        on this site.
      </P>

      <H2>Local storage</H2>
      <P>
        If you switch between light and dark mode, that single preference is saved in
        your browser&apos;s local storage under the key <code>theme</code>. It never
        leaves your device, is not transmitted to any server, and is not used to
        identify you. Clearing your browser data removes it.
      </P>

      <H2>Hosting and server logs</H2>
      <P>
        The site is hosted on Vercel. Like any web host, Vercel processes technical
        request data — including IP address, user agent, and timestamp — in order to
        deliver pages and protect against abuse. That processing is governed by
        Vercel&apos;s own privacy policy. Fonts are self-hosted at build time rather
        than loaded from a third-party font CDN, so viewing this site does not send a
        request to Google Fonts.
      </P>

      <H2>Email</H2>
      <P>
        If you email the address published on this site, that message and your email
        address are retained in the ordinary course of correspondence so the
        conversation can be answered and referred back to. It is not added to any
        marketing list and not shared with third parties.
      </P>

      <H2>What is never done</H2>
      <P>
        Personal data from this site is never sold, rented, or traded. It is not
        shared with data brokers or advertisers. No profiles are built for
        advertising purposes, and no automated decisions are made about you.
      </P>

      <H2>Your requests</H2>
      <P>
        If you want to know what is held about you, or want correspondence deleted,
        email{" "}
        <a href={`mailto:${EMAIL}`} style={{ color: C.accent }}>
          {EMAIL}
        </a>{" "}
        and it will be handled. Because the site itself stores no personal records,
        such requests generally concern email correspondence only.
      </P>

      <H2>Changes</H2>
      <P>
        If this policy changes materially, the updated version will be published on
        this page with a revised date below.
      </P>

      <p style={{ fontSize: 13, color: C.textDim, marginTop: 36, fontWeight: 300 }}>
        Last updated: {UPDATED}
      </p>
    </PageShell>
  );
}
