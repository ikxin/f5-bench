"use client";

import { Button, Card, Form } from "@douyinfe/semi-ui-19";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [thread, setThread] = useState<number>(20);
  const [confirm1, setConfirm1] = useState(false);
  const [confirm2, setConfirm2] = useState(false);

  const [count, setCount] = useState(0);
  const [qps, setQps] = useState(0);
  const [countTime, setCountTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadQueueRef = useRef<number[]>([]);
  const controllerQueueRef = useRef<AbortController[]>([]);
  const startTimeRef = useRef(0);

  const endBench = useCallback(() => {
    threadQueueRef.current.forEach((timerId) => {
      window.clearInterval(timerId);
    });
    threadQueueRef.current = [];

    controllerQueueRef.current.forEach((controller) => {
      controller.abort();
    });
    controllerQueueRef.current = [];
    setRunning(false);
  }, []);

  useEffect(() => {
    if (startTimeRef.current === 0) {
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    setCountTime(elapsed);
    setQps(elapsed > 0 ? (count / elapsed) * 1000 : 0);
  }, [count]);

  useEffect(() => {
    return () => {
      endBench();
    };
  }, [endBench]);

  const startBench = () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("请输入 URL");
      return;
    }

    if (/gov/i.test(trimmedUrl)) {
      setError("检测到违规 URL");
      return;
    }

    try {
      new URL(trimmedUrl);
    } catch {
      setError("检测到无效 URL");
      return;
    }

    if (!confirm1 || !confirm2) {
      setError("请阅读并勾选确认项");
      return;
    }

    if (!Number.isFinite(thread) || thread <= 0) {
      setError("请输入并发数");
      return;
    }

    endBench();
    setError(null);
    setCount(0);
    setQps(0);
    setCountTime(0);
    startTimeRef.current = Date.now();
    setRunning(true);

    for (let i = 0; i < thread; i++) {
      const timerId = window.setInterval(() => {
        setCount((previous) => previous + 1);
        const controller = new AbortController();
        controllerQueueRef.current.push(controller);

        fetch(trimmedUrl, {
          method: "GET",
          mode: "no-cors",
          signal: controller.signal,
        }).catch(() => {});
      }, 10);

      threadQueueRef.current.push(timerId);
    }
  };

  return (
    <Card>
      <Form>
        <Form.Input
          field="url"
          label={{ text: "URL", required: true }}
        ></Form.Input>
        <Form.InputNumber
          field="thread"
          label={{ text: "并发数", required: true }}
          className="w-full"
        ></Form.InputNumber>
        <Form.Checkbox field="agree" noLabel>
          我确认以上 URL 仅用于测试
        </Form.Checkbox>
        <Form.Checkbox field="agree2" noLabel>
          对其造成的一切后果，本人承担所有责任
        </Form.Checkbox>
      </Form>
      <div className="flex gap-4 py-3">
        <Button block>开始</Button>
        <Button block>停止</Button>
      </div>
      <div className="my-3 grid grid-cols-[auto_1fr] overflow-hidden rounded-(--semi-border-radius-small) border border-(--semi-color-border)">
        <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
          累计请求总数
        </div>
        <div className="border-b border-(--semi-color-border) px-4 py-1.5">
          {count} 次
        </div>

        <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
          请求速率
        </div>
        <div className="border-b border-(--semi-color-border) px-4 py-1.5">
          {qps.toFixed(0)} 次/秒
        </div>

        <div className="border-r border-(--semi-color-border) px-4 py-1.5">
          累计用时
        </div>
        <div className="border-(--semi-color-border) px-4 py-1.5">
          {(countTime / 1000).toFixed(2)} 秒
        </div>
      </div>
    </Card>
  );
}
