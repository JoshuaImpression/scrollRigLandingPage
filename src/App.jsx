import React, { Suspense, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Environment, Loader } from "@react-three/drei";

import { BodyCopy, Headline, Subtitle } from "./Text";
import { Image } from "./Image";
import { ImageCube } from "./ImageCube";
import { WebGLBackground } from "./WebGLBackground";
import { Lens } from "./Lens";
import CodropsFrame from "./CodropsFrame";
import EffectsToggle from "./EffectsToggle";

import "@14islands/r3f-scroll-rig/css";

// Photos by <a href="https://unsplash.com/@maxberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maxim Berg</a> on <a href="https://unsplash.com/photos/u8maxDvbae8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    // We attach events onparent div in order to get events on both canvas and DOM
    <div ref={eventSource}>
      <CodropsFrame />
      <GlobalCanvas
        // shader errors are hidden by default which speeds up compilation
        debug={false}
        // scaleMultiplier is a scroll-rig setting to scale the entire scene
        scaleMultiplier={0.01}
        // All other props on the R3F Canvas is supported:
        eventSource={eventSource}
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {(globalChildren) => (
          <Lens>
            <WebGLBackground />
            <Suspense fallback="">
              {/* 
                Our materials use PBR ligting and requires an environment
              */}
              <Environment files="env/empty_warehouse_01_1k.hdr" />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={enabled}
        config={{ syncTouch: true }} // Lenis setting to force smooth scroll on touch devices
      />
      <article>
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline wobble>
                IMMERSIVE DIGITAL EXPERIENCE AGENCY
              </Headline>
            </h2>
            <BodyCopy as="p" className="subline">
              Impression is now Show + Tell, a digital-first branding & web product agency expertly creating impactful experiences for high-growth brands.
            </BodyCopy>
          </div>
        </header>
        <section className="container">
          <Image
            src="images/bloom.webp"
            className="ImageLandscape"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Show + Tell is a digital-first branding and technology agency, 
            enabling companies to connect with their audience, extend their reach and enjoy greater commercial success.</Subtitle>
          </h3>
        </section>
        <section className="ParallaxContainer">
          <Image
            src="images/inga.webp"
            className="aspect-9_13"
            parallaxSpeed={1.08}
          />
          <Image
            src="images/launch-hero.webp"
            className="aspect-16_11"
            parallaxSpeed={0.92}
          />
        </section>
        <section className="container">
          <h4>
            <BodyCopy>
              Our approach is a carefully crafted journey, ensuring that your brand stands out, connects with your target audience,
              and enjoys greater commerical success.
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src="images/brand-cube.webp"
            className="JellyPlaceholder"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>We are a full service & development agency based in Harrogate, London & Cambridge,</Subtitle>
            <em>
              <Subtitle>
                working to elevate global brands and solve complex problems through brand & digital innovative solutions.
              </Subtitle>
            </em>
          </h3>
        </section>
        <footer>
          <CodropsFrame />
        </footer>
      </article>

      <Loader
        containerStyles={{
          background: "transparent",
          top: "auto",
          bottom: 0,
          height: "5px",
        }}
        innerStyles={{ background: "white", width: "100vw", height: "5px" }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
      />
    </div>
  );
}
