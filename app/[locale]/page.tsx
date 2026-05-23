"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Form } from "@douyinfe/semi-ui";
import gsap from "gsap";

type InitValues = {
  url: string;
  thread: number;
  agree: boolean;
};

const initValues: InitValues = {
  url: "https://example.com",
  thread: 1,
  agree: false,
};

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function AnimatedAction({ children }: { children: React.ReactNode }) {
  const actionRef = useRef<HTMLDivElement>(null);

  useBrowserLayoutEffect(() => {
    const action = actionRef.current;

    if (!action || prefersReducedMotion()) {
      return;
    }

    const hover = () => {
      gsap.to(action, {
        duration: 0.22,
        ease: "power3.out",
        scale: 1.025,
        y: -1,
      });
    };
    const release = () => {
      gsap.to(action, {
        duration: 0.35,
        ease: "elastic.out(1, 0.62)",
        scale: 1,
        y: 0,
      });
    };
    const press = () => {
      gsap.to(action, {
        duration: 0.08,
        ease: "power2.out",
        scale: 0.975,
        y: 1,
      });
    };

    action.addEventListener("pointerenter", hover);
    action.addEventListener("pointerleave", release);
    action.addEventListener("pointerdown", press);
    action.addEventListener("pointerup", hover);

    return () => {
      action.removeEventListener("pointerenter", hover);
      action.removeEventListener("pointerleave", release);
      action.removeEventListener("pointerdown", press);
      action.removeEventListener("pointerup", hover);
      gsap.killTweensOf(action);
    };
  }, []);

  return (
    <div
      ref={actionRef}
      className="flex-1 transform-gpu will-change-transform"
      data-gsap-action
    >
      {children}
    </div>
  );
}

function AnimatedMetricValue({
  value,
  className = "",
}: {
  value: string | number;
  className?: string;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useBrowserLayoutEffect(() => {
    const valueElement = valueRef.current;

    if (!valueElement) {
      return;
    }

    if (!hasAnimated.current) {
      hasAnimated.current = true;
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    gsap.fromTo(
      valueElement,
      {
        autoAlpha: 0,
        filter: "blur(2px)",
        y: 7,
      },
      {
        autoAlpha: 1,
        duration: 0.2,
        ease: "back.out(2.2)",
        filter: "blur(0px)",
        overwrite: true,
        y: 0,
      },
    );

    return () => gsap.killTweensOf(valueElement);
  }, [value]);

  return (
    <span
      ref={valueRef}
      className={`inline-block min-w-10 transform-gpu tabular-nums will-change-transform ${className}`}
      data-gsap-metric-value
    >
      {value}
    </span>
  );
}

export default function Page() {
  const t = useTranslations();

  const shellRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const threadQueue = useRef<NodeJS.Timeout[]>([]);
  const controllerQueue = useRef<AbortController[]>([]);
  const startAt = useRef(0);
  const latestRequestCount = useRef(0);
  const statsTimer = useRef<NodeJS.Timeout | null>(null);

  const [displayRequestCount, setDisplayRequestCount] = useState(0);
  const [displayElapsedMs, setDisplayElapsedMs] = useState(0);

  useBrowserLayoutEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    const context = gsap.context(() => {
      const fields = gsap.utils.toArray<HTMLElement>("[data-gsap-field]");
      const actions = gsap.utils.toArray<HTMLElement>("[data-gsap-action]");
      const metrics = gsap.utils.toArray<HTMLElement>("[data-gsap-metric]");
      const metricValues = gsap.utils.toArray<HTMLElement>(
        "[data-gsap-metric-value]",
      );
      const allTargets = [shell, ...fields, ...actions, ...metrics];

      if (prefersReducedMotion()) {
        gsap.set(allTargets, {
          autoAlpha: 1,
          clearProps: "filter,transform",
        });
        return;
      }

      gsap.set(shell, {
        autoAlpha: 0,
        filter: "blur(10px)",
        scale: 0.985,
        y: 28,
      });
      gsap.set(fields, { autoAlpha: 0, y: 14 });
      gsap.set(actions, { autoAlpha: 0, scale: 0.96, y: 12 });
      gsap.set(metrics, { autoAlpha: 0, y: 10 });
      gsap.set(metricValues, {
        clipPath: "inset(0 100% 0 0)",
      });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(shell, {
          autoAlpha: 1,
          duration: 0.58,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
        })
        .to(
          fields,
          {
            autoAlpha: 1,
            duration: 0.38,
            stagger: 0.055,
            y: 0,
          },
          "-=0.28",
        )
        .to(
          actions,
          {
            autoAlpha: 1,
            duration: 0.34,
            scale: 1,
            stagger: 0.055,
            y: 0,
          },
          "-=0.18",
        )
        .to(
          metrics,
          {
            autoAlpha: 1,
            duration: 0.28,
            stagger: 0.035,
            y: 0,
          },
          "-=0.16",
        )
        .to(
          metricValues,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.36,
            ease: "power2.out",
            stagger: 0.045,
          },
          "-=0.18",
        );
    }, shell);

    return () => context.revert();
  }, []);

  const syncDisplayedStats = useCallback(() => {
    setDisplayRequestCount(latestRequestCount.current);
    setDisplayElapsedMs(startAt.current ? Date.now() - startAt.current : 0);
  }, []);

  const animateStatsFeedback = useCallback((direction: "start" | "stop") => {
    const stats = statsRef.current;

    if (!stats || prefersReducedMotion()) {
      return;
    }

    gsap.killTweensOf(stats);

    if (direction === "start") {
      gsap
        .timeline()
        .to(stats, {
          boxShadow: "0 0 0 1px rgba(0, 100, 250, 0.24)",
          duration: 0.14,
          ease: "power2.out",
          scale: 1.01,
        })
        .to(stats, {
          boxShadow: "0 0 0 0 rgba(0, 100, 250, 0)",
          duration: 0.42,
          ease: "power3.out",
          scale: 1,
        });
      return;
    }

    gsap.fromTo(
      stats,
      { x: -2 },
      {
        duration: 0.24,
        ease: "power2.out",
        keyframes: [{ x: 2 }, { x: -1 }, { x: 0 }],
      },
    );
  }, []);

  const handleStop = useCallback(() => {
    threadQueue.current.forEach((timer) => clearInterval(timer));
    threadQueue.current.length = 0;
    controllerQueue.current.forEach((ctrl) => ctrl.abort());
    controllerQueue.current.length = 0;

    if (statsTimer.current) {
      clearInterval(statsTimer.current);
      statsTimer.current = null;
    }
  }, []);

  const handleSubmit = (values: typeof initValues) => {
    handleStop();
    animateStatsFeedback("start");
    latestRequestCount.current = 0;
    startAt.current = Date.now();
    setDisplayRequestCount(0);
    setDisplayElapsedMs(0);
    statsTimer.current = setInterval(syncDisplayedStats, 80);

    for (let i = 0; i < values.thread; i++) {
      threadQueue.current[i] = setInterval(() => {
        latestRequestCount.current += 1;
        const controller = new AbortController();
        controllerQueue.current.push(controller);
        fetch(values.url, {
          method: "GET",
          mode: "no-cors",
          signal: controller.signal,
        }).catch(() => {});
      }, 10);
    }
  };

  const handleStopClick = () => {
    handleStop();
    syncDisplayedStats();
    animateStatsFeedback("stop");
  };

  useEffect(() => handleStop, [handleStop]);

  const requestSpeed = displayElapsedMs
    ? (displayRequestCount / displayElapsedMs) * 1000
    : 0;
  const requestSpeedFormatted = requestSpeed.toFixed(0);
  const timeTotalSeconds = displayElapsedMs / 1000;
  const timeTotalFormatted = timeTotalSeconds.toFixed(1);

  return (
    <div
      ref={shellRef}
      className="transform-gpu will-change-[transform,filter,opacity]"
    >
      <Card className="w-md">
        <Form
          initValues={initValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          <div data-gsap-field>
            <Form.Input
              field="url"
              label={{ text: t("form.urlLabel"), required: true }}
              rules={[
                {
                  required: true,
                  type: "url",
                  message: t("form.urlRequired"),
                },
                { pattern: /^(?!.*gov).*$/, message: t("form.urlInvalid") },
              ]}
              placeholder={t("form.urlPlaceholder")}
              trigger={["blur", "change"]}
            />
          </div>
          <div data-gsap-field>
            <Form.InputNumber
              field="thread"
              label={{ text: t("form.threadLabel"), required: true }}
              className="w-full"
            />
          </div>
          <div data-gsap-field>
            <Form.Checkbox
              field="agree"
              validate={(val) => (val ? "" : t("form.agreeRequired"))}
              noLabel
            >
              {t("form.agree")}
            </Form.Checkbox>
          </div>
          <div className="flex gap-4 py-3">
            <AnimatedAction>
              <Button block type="primary" htmlType="submit">
                {t("form.start")}
              </Button>
            </AnimatedAction>
            <AnimatedAction>
              <Button block type="danger" onClick={handleStopClick}>
                {t("form.stop")}
              </Button>
            </AnimatedAction>
          </div>
        </Form>
        <div
          ref={statsRef}
          className="my-3 grid transform-gpu grid-cols-[auto_1fr] overflow-hidden rounded-(--semi-border-radius-small) border border-(--semi-color-border) will-change-[transform,box-shadow]"
        >
          <div
            className="border-r border-b border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            {t("stats.totalRequests")}
          </div>
          <div
            className="border-b border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            <AnimatedMetricValue value={displayRequestCount} />{" "}
            {t("stats.timesUnit")}
          </div>
          <div
            className="border-r border-b border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            {t("stats.requestSpeed")}
          </div>
          <div
            className="border-b border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            <AnimatedMetricValue value={requestSpeedFormatted} />{" "}
            {t("stats.speedUnit")}
          </div>
          <div
            className="border-r border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            {t("stats.totalTime")}
          </div>
          <div
            className="border-(--semi-color-border) px-4 py-1.5 whitespace-nowrap tabular-nums"
            data-gsap-metric
          >
            <AnimatedMetricValue value={timeTotalFormatted} />{" "}
            {t("stats.secondsUnit")}
          </div>
        </div>
      </Card>
    </div>
  );
}
