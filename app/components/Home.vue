<script setup lang="ts">
const test = useGet({
  url: '/test',
  key: testKeys.all,
  enabled: false,
});

const onClickFetch = () => {
  console.log('클릭');
  test.execute();
};

</script>

<template>
  <button type='button' @click='onClickFetch'>
    클릭
  </button>

  <div>
    {{ test.data }}
  </div>
</template>

<style scoped>

</style>
