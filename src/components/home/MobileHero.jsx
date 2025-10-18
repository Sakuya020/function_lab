"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { renderStarEmphasis } from "@/lib/utils";

const MobileHero = ({ src, poster, info }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Safari 视频自动播放修复
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented, attempting muted playback:", error);
          video.muted = true;
          video.play().catch((e) => console.log("Playback failed:", e));
        });
      }
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // 刷新 ScrollTrigger 确保正确计算
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      // 滚动触发的范围：顶部 0px 到 底部 300%
      scrollTrigger: {
        trigger: ".mobile-hero",
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        pinSpacing: "margin",
        anticipatePin: 1,
      },
    });

    const split = new SplitText(".mobile-hero-info", { type: "words" });
    gsap.set(split.words, { opacity: 0 });

    // 先把视频包装一层，确保 overflow: hidden
    gsap.set(".mobile-hero-video", {
      scale: 1,
      yPercent: 0,
      transformOrigin: "50% 50%",
    });

    tl.fromTo(
      ".mobile-hero-video",
      { scale: 1, yPercent: 0 },
      { scale: 1.8, yPercent: -65, ease: "power1.inOut", duration: 1 }
    )
      .fromTo(
        ".mobile-hero-info",
        { y: "76vh" },
        { y: "71vh", ease: "power1.inOut", duration: 1 },
        "<0.3"
      )
      .to(
        split.words,
        { opacity: 1, stagger: 0.05, ease: "power1.out", duration: 0.7 },
        "<0.2"
      );

    return () => {
      split.revert();
      tl.kill();
    };
  });

  return (
    <section className="mobile-hero relative flex min-h-[100dvh] items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <div className="mobile-hero-frame">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="mobile-hero-video w-full object-cover"
          webkit-playsinline="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {info && (
        <p className="mobile-hero-info absolute left-0 right-0 top-0 mt-0 translate-y-[100vh] text-[24px] leading-[26px] padding-x">
          {renderStarEmphasis(info)}
        </p>
      )}
    </section>
  );
};

export default MobileHero;
