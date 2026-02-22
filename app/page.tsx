"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "@douyinfe/semi-ui-19";

export default function Page() {
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

  return (
    <Card className="w-md">
      <Form initValues={initValues} onSubmit={(values) => handleSubmit(values)}>
        <Form.Input
          field="url"
          label={{ text: "URL", required: true }}
          rules={[
            { required: true, type: "url", message: "请输入 URL" },
            { pattern: /^(?!.*gov).*$/, message: "检测到违规 URL" },
          ]}
          placeholder="https://example.com"
          trigger={["blur", "change"]}
        />
        <Form.InputNumber
          field="thread"
          label={{ text: "并发", required: true }}
          className="w-full"
        />
        <Form.Checkbox
          field="agree"
          validate={(val) => (val ? "" : "请同意相关条款")}
          noLabel
        >
          本人确认对其造成的一切后果负责
        </Form.Checkbox>
        <div className="flex gap-4 py-3">
          <Button block type="primary" htmlType="submit">
            开始
          </Button>
          <Button block type="danger" onClick={handleStop}>
            停止
          </Button>
        </div>
      </Form>
      <div className="my-3 grid grid-cols-[auto_1fr] overflow-hidden rounded-(--semi-border-radius-small) border border-(--semi-color-border)">
        <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
          请求总数
        </div>
        <div className="border-b border-(--semi-color-border) px-4 py-1.5">
          {requestCount} 次
        </div>
        <div className="border-r border-b border-(--semi-color-border) px-4 py-1.5">
          请求速率
        </div>
        <div className="border-b border-(--semi-color-border) px-4 py-1.5">
          {requestSpeed.toFixed(0)} 次/秒
        </div>
        <div className="border-r border-(--semi-color-border) px-4 py-1.5">
          累计用时
        </div>
        <div className="border-(--semi-color-border) px-4 py-1.5">
          {timeTotal / 1000} 秒
        </div>
      </div>
    </Card>
  );
}
