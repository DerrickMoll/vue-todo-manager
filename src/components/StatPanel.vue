<script setup lang="ts">
type AccentTone = 'warm' | 'cool' | 'gold' | 'rose'

defineProps<{
  items: Array<{
    label: string
    value: number | string
    helper: string
    accent: AccentTone
  }>
}>()
</script>

<template>
  <div class="stat-panel">
    <article v-for="item in items" :key="item.label" class="stat-panel__card surface-card" :class="`accent-${item.accent}`">
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <p>{{ item.helper }}</p>
    </article>
  </div>
</template>

<style scoped>
.stat-panel {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-panel__card {
  position: relative;
  padding: 22px;
  overflow: hidden;
}

.stat-panel__card::after {
  position: absolute;
  inset: auto -36px -36px auto;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  content: '';
  opacity: 0.24;
}

.accent-warm::after {
  background: #ff9068;
}

.accent-cool::after {
  background: #2dd4bf;
}

.accent-gold::after {
  background: #fbbf24;
}

.accent-rose::after {
  background: #fb7185;
}

.stat-panel__card span,
.stat-panel__card p {
  margin: 0;
  color: var(--muted);
}

.stat-panel__card strong {
  display: block;
  margin: 12px 0 6px;
  font-size: 32px;
}

@media (max-width: 1024px) {
  .stat-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .stat-panel {
    grid-template-columns: 1fr;
  }
}
</style>
