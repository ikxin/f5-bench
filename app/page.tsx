"use client";

import * as z from "zod";
import { Button, Card, Form, Toast } from "@douyinfe/semi-ui-19";
import { useEffect, useRef, useState } from "react";

const formSchema = z.object({
  url: z
    .url({ message: "检测到无效 URL" })
    .refine((value) => !/gov/i.test(value), {
      message: "检测到违规 URL（包含 gov 关键词）",
    }),
  thread: z
    .number()
    .int({ message: "并发数必须为整数" })
    .positive({ message: "并发数必须大于 0" }),
  confirm1: z.any().refine((value) => value === true, {
    message: "请确认 URL 仅用于测试",
  }),
  confirm2: z.any().refine((value) => value === true, {
    message: "请确认承担所有责任",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const formApiRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);
  const ctrlRef = useRef<AbortController[]>([]);
  const startAtRef = useRef(0);

  const [count, setCount] = useState(0);
  const [qps, setQps] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const getFormApi = (formApi: any) => {
    formApiRef.current = formApi;
  };

  const stopBench = () => {
    timerRef.current.forEach((timer) => clearInterval(timer));
    timerRef.current = [];

    ctrlRef.current.forEach((ctrl) => ctrl.abort());
    ctrlRef.current = [];
  };

  const startBench = (values: FormValues) => {
    stopBench();
    startAtRef.current = Date.now();
    setCount(0);
    setQps(0);
    setElapsedMs(0);

    for (let i = 0; i < values.thread; i++) {
      const timer = setInterval(() => {
        setCount((prev) => prev + 1);
        const ctrl = new AbortController();
        ctrlRef.current.push(ctrl);
        fetch(values.url, {
          method: "GET",
          mode: "no-cors",
          signal: ctrl.signal,
        }).catch(() => {});
      }, 10);
      timerRef.current.push(timer);
    }
  };

  const submit = (values?: FormValues) => {
    const currentValues =
      values ?? (formApiRef.current?.getValues() as FormValues | undefined);

    if (!currentValues) {
      return;
    }

    if (formApiRef.current) {
      const { errors } = formApiRef.current.getFormState();
      Object.keys(errors || {}).forEach((field) => {
        formApiRef.current.setError(field, "");
      });
    }

    const result = formSchema.safeParse(currentValues);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;

        if (formApiRef.current) {
          formApiRef.current.setError(field, message);
        }
      });

      Toast.error(result.error.issues[0].message);
      return;
    }

    startBench(result.data);
    Toast.success("已开始");
  };

  useEffect(() => {
    if (!startAtRef.current) {
      return;
    }
    const ms = Date.now() - startAtRef.current;
    setElapsedMs(ms);
    setQps(ms > 0 ? (count / ms) * 1000 : 0);
  }, [count]);

  useEffect(() => () => stopBench(), []);

  return (
    <Card>
      <Form getFormApi={getFormApi}>
        <Form.Input
          field="url"
          label={{ text: "URL", required: true }}
          placeholder="https://www.cloudflare.com"
        />
        <Form.InputNumber
          field="thread"
          label={{ text: "并发", required: true }}
          initValue={20}
          className="w-full"
        />
        <Form.Checkbox field="confirm1" noLabel>
          我确认以上 URL 仅用于测试
        </Form.Checkbox>
        <Form.Checkbox field="confirm2" noLabel>
          对其造成的一切后果，本人承担所有责任
        </Form.Checkbox>
        <div className="flex gap-4 py-3">
          <Button block type="primary" onClick={() => submit()}>
            开始
          </Button>
          <Button block type="danger" onClick={stopBench}>
            停止
          </Button>
        </div>
      </Form>
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
          {(elapsedMs / 1000).toFixed(1)} 秒
        </div>
      </div>
    </Card>
  );
}
