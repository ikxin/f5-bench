<script lang="ts" setup>
const formData = ref({
  url: "",
  thread: 20,
  confirm1: false,
  confirm2: false,
});

const threadQueue: NodeJS.Timeout[] = [];

const controllerQueue: AbortController[] = [];

const count = ref(0);

const qps = ref(0);

const countTime = ref(0);

let startTime: number;

watch(count, () => {
  countTime.value = Date.now() - startTime;
  qps.value = (count.value / countTime.value) * 1000;
});

const startBench = () => {
  startTime = Date.now();
  count.value = 0;
  for (let i = 0; i < formData.value.thread; i++) {
    threadQueue[i] = setInterval(() => {
      count.value++;
      const controller = new AbortController();
      controllerQueue.push(controller);
      fetch(formData.value.url, {
        method: "GET",
        mode: "no-cors",
        signal: controller.signal,
      }).catch(() => {});
    }, 10);
  }
};

const endBench = () => {
  threadQueue.forEach((item) => {
    clearInterval(item);
  });

  controllerQueue.forEach((item) => {
    item.abort();
  });

  controllerQueue.length = 0;
};
</script>

<template>
  <ACard class="w-96 m-auto select-none">
    <AForm
      ref="formRef"
      :model="formData"
      layout="vertical"
      @submit-success="startBench"
    >
      <AFormItem
        field="url"
        label="URL"
        :rules="[
          { required: true, message: '请输入 URL' },
          {
            match: /^(?!.*gov).*$/,
            message: '检测到违规 URL',
          },
          {
            type: 'url',
            message: '检测到无效 URL',
          },
        ]"
        :validate-trigger="['blur', 'change', 'input', 'focus']"
      >
        <AInput
          v-model:model-value="formData.url"
          placeholder="https://www.cloudflare.com/"
        />
      </AFormItem>
      <AFormItem
        field="thread"
        label="并发"
        :rules="[{ required: true, message: '请输入并发数' }]"
      >
        <AInputNumber v-model:model-value="formData.thread" />
      </AFormItem>
      <AFormItem
        field="confirm1"
        class="!mb-0"
        :rules="[{ type: 'boolean', true: true, message: '请阅读并勾选' }]"
        hide-label
      >
        <ACheckbox v-model="formData.confirm1">
          我确认以上 URL 仅用于测试
        </ACheckbox>
      </AFormItem>
      <AFormItem
        field="confirm2"
        class="!mb-0"
        :rules="[{ type: 'boolean', true: true, message: '请阅读并勾选' }]"
        hide-label
      >
        <ACheckbox v-model="formData.confirm2">
          对其造成的一切后果，本人承担所有责任
        </ACheckbox>
      </AFormItem>
      <AFormItem hide-label class="mt-4">
        <div class="flex gap-2">
          <AButton type="primary" html-type="submit">开始</AButton>
          <AButton type="primary" @click="endBench()">停止</AButton>
        </div>
      </AFormItem>
      <ADescriptions :column="1" bordered>
        <ADescriptionsItem label="累计请求总数">
          {{ count }} 次
        </ADescriptionsItem>
        <ADescriptionsItem label="请求速率">
          {{ qps.toFixed(0) }} 次/秒
        </ADescriptionsItem>
        <ADescriptionsItem label="累计用时">
          {{ countTime / 1000 }} 秒
        </ADescriptionsItem>
      </ADescriptions>
    </AForm>
  </ACard>
</template>
