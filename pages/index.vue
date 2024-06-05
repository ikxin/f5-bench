<script lang="ts" setup>
const formData = ref({
  url: "https://one.one.one.one/",
  thread: 20,
});

let threadQueue: NodeJS.Timeout[] = [];

let controllerQueue: AbortController[] = [];

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
  <ACard class="w-96 m-auto">
    <AForm :model="formData" class="mt-4">
      <AFormItem label="URL" field="url">
        <AInput v-model:model-value="formData.url"></AInput>
      </AFormItem>
      <AFormItem label="并发" field="thread">
        <AInputNumber v-model:model-value="formData.thread"></AInputNumber>
      </AFormItem>
      <AFormItem>
        <div class="flex justify-end gap-2 w-full">
          <AButton type="primary" @click="startBench()">开始</AButton>
          <AButton type="primary" @click="endBench()">停止</AButton>
        </div>
      </AFormItem>
      <ADescriptions :column="1" bordered>
        <ADescriptionsItem label="累计请求总数">{{ count }}</ADescriptionsItem>
        <ADescriptionsItem label="请求速率">{{ qps }}</ADescriptionsItem>
        <ADescriptionsItem label="累计用时">{{ countTime }}</ADescriptionsItem>
      </ADescriptions>
    </AForm>
  </ACard>
</template>
