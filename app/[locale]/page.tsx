"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Form } from "@douyinfe/semi-ui";
import { AnimatePresence, motion } from "motion/react";

export default function Page() {
  const t = useTranslations();

  const initValues = {
    url: "https://example.com",
    thread: 1,
    agree: false,
  };

  const threadQueue = useRef<NodeJS.Timeout[]>([]);
  const controllerQueue = useRef<AbortController[]>([]);
  const startAt = useRef(0);

  const [requestCount, setRequestCount] = useState(0);
  const [requestSpeed, setRequestSpeed] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0);

  const handleSubmit = (values: typeof initValues) => {
    startAt.current = Date.now();
    setRequestCount(0);
    for (let i = 0; i < values.thread; i++) {
      threadQueue.current[i] = setInterval(() => {
        setRequestCount((prev) => prev + 1);
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

  const handleStop = () => {
    threadQueue.current.forEach((timer) => clearInterval(timer));
    threadQueue.current.length = 0;
    controllerQueue.current.forEach((ctrl) => ctrl.abort());
    controllerQueue.current.length = 0;
  };

  useEffect(() => {
    if (!startAt.current) return;
    const ms = Date.now() - startAt.current;
    setTimeTotal(ms);
    setRequestSpeed((requestCount / ms) * 1000);
  }, [requestCount]);

  const requestSpeedFormatted = requestSpeed.toFixed(0);
  const timeTotalSeconds = timeTotal / 1000;
  const timeTotalKey = Math.floor(timeTotalSeconds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="w-md">
        <Form initValues={initValues} onSubmit={(values) => handleSubmit(values)}>
        <Form.Input
          field="url"
          label={{ text: t("form.urlLabel"), required: true }}
          rules={[
            { required: true, type: "url", message: t("form.urlRequired") },
            { pattern: /^(?!.*gov).*$/, message: t("form.urlInvalid") },
          ]}
          placeholder={t("form.urlPlaceholder")}
          trigger={["blur", "change"]}
        />
        <Form.InputNumber
          field="thread"
          label={{ text: t("form.threadLabel"), required: true }}
          className="w-full"
        />
        <Form.Checkbox
          field="agree"
          validate={(val) => (val ? "" : t("form.agreeRequired"))}
          noLabel
        >
          {t("form.agree")}
        </Form.Checkbox>
          <div className="flex gap-4 py-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button block type="primary" htmlType="submit">
                {t("form.start")}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button block type="danger" onClick={handleStop}>
                {t("form.stop")}
              </Button>
            </motion.div>
          </div>
        </Form>
        <motion.div
          className="my-3 grid grid-cols-[auto_1fr] overflow-hidden rounded-(--semi-border-radius-small) border border-(--semi-color-border)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
        >
          <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
            {t("stats.totalRequests")}
          </div>
          <div className="border-b border-(--semi-color-border) px-4 py-1.5">
            <AnimatePresence initial={false}>
              <motion.span
                key={requestCount}
                className="inline-block"
                initial={{ opacity: 0, y: 8, filter: "blur(1.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {requestCount}
              </motion.span>
            </AnimatePresence>{" "}
            {t("stats.timesUnit")}
          </div>
          <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
            {t("stats.requestSpeed")}
          </div>
          <div className="border-b border-(--semi-color-border) px-4 py-1.5">
            <AnimatePresence initial={false}>
              <motion.span
                key={requestSpeedFormatted}
                className="inline-block"
                initial={{ opacity: 0, y: 8, filter: "blur(1.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {requestSpeedFormatted}
              </motion.span>
            </AnimatePresence>{" "}
            {t("stats.speedUnit")}
          </div>
          <div className="border-r border-(--semi-color-border) px-4 py-1.5">
            {t("stats.totalTime")}
          </div>
          <div className="border-(--semi-color-border) px-4 py-1.5">
            <AnimatePresence initial={false}>
              <motion.span
                key={timeTotalKey}
                className="inline-block"
                initial={{ opacity: 0, y: 8, filter: "blur(1.5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {timeTotalSeconds}
              </motion.span>
            </AnimatePresence>{" "}
            {t("stats.secondsUnit")}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
