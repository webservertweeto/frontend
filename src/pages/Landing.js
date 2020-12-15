import React from "react";

import Hero from "../components/sections/Hero";
import LandingLayout from "../components/layouts/LandingLayout";
import logo from "../utils/tweeto-trans.png"

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="Worrying about scheduling your tweets is a problem of the past..."
        subtitle="Tweeto allows you to create, store and choose when you want your tweets posted!"
        image={logo}
        ctaText="Create your account now"
        ctaLink="/auth/sign-up"
      />
    </LandingLayout>
  );
}
