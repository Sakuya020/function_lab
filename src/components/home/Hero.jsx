"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { renderStarEmphasis } from "@/lib/utils";

const Hero = ({ src, poster, info }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    let hasPlayed = false;

    // 尝试自动播放
    const attemptAutoPlay = () => {
      if (hasPlayed) return;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasPlayed = true;
          })
          .catch((error) => {
            console.log(
              "Autoplay blocked, waiting for user interaction:",
              error
            );
          });
      }
    };

    // 用户交互后立即播放（无感知）
    const playOnInteraction = () => {
      if (hasPlayed || !video.paused) return;

      video
        .play()
        .then(() => {
          hasPlayed = true;
        })
        .catch((err) => console.log("Play failed:", err));
    };

    // 监听多种用户交互事件
    const events = ["click", "scroll", "touchstart", "mousemove", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, playOnInteraction, {
        once: true,
        passive: true,
      });
    });

    // 立即尝试自动播放
    if (video.readyState >= 3) {
      attemptAutoPlay();
    } else {
      video.addEventListener("loadeddata", attemptAutoPlay, { once: true });
    }

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, playOnInteraction);
      });
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        pinSpacing: "margin",
        anticipatePin: 1,
      },
    });

    const split = new SplitText(".hero-info", { type: "words" });
    gsap.set(split.words, { opacity: 0 });

    tl.fromTo(
      ".hero-video",
      { width: "100%", height: "100%" },
      { width: "0%", height: "0%", ease: "power1.inOut", duration: 1 }
    )
      .fromTo(
        ".hero-info",
        { y: "107vh" },
        { y: "73vh", ease: "power1.inOut", duration: 1 },
        "<5%"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.04, ease: "power1.inOut", duration: 0.5 },
        "<"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="hero relative">
      <figure className="flex h-screen w-full items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="w-full h-full object-cover hero-video"
          webkit-playsinline="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      </figure>

      {info && (
        <p className="hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[110vh] text-md padding-x">
          {renderStarEmphasis(info)}
        </p>
      )}
    </section>
  );
};

export default Hero;
