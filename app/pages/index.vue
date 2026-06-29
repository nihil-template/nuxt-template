<template>
  <main class="page">
    <section class="panel">
      <p class="eyebrow">Nuxt Template</p>
      <h1>시작 준비가 된 기본 템플릿</h1>
      <p class="description">
        이 화면만 남겨 둔 최소 구성입니다. 프론트 쿼리 컴포저블과 PostgreSQL Drizzle
        시작점이 함께 포함되어 있습니다.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TemplateHomePage',
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    radial-gradient(circle at top, rgba(19, 78, 74, 0.18), transparent 42%),
    linear-gradient(180deg, #f7f8f4 0%, #eef2eb 100%);
  color: #14231e;
}

.panel {
  width: min(100%, 42rem);
  padding: 3rem;
  border: 1px solid rgba(20, 35, 30, 0.12);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 24px 60px rgba(20, 35, 30, 0.08);
  backdrop-filter: blur(18px);
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #3a6b5e;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.05;
}

.description {
  margin: 1rem 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #385149;
}
</style>
