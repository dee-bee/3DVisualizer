<script setup>
import { onMounted, ref } from 'vue'
import { max, scaleBand, scaleLinear, select } from 'd3'

const chart = ref(null)
const data = [
  { category: 'Apples', value: 7 },
  { category: 'Pears', value: 4 },
  { category: 'Plums', value: 9 },
  { category: 'Peaches', value: 6 },
]

onMounted(() => {
  const svg = select(chart.value)
  const x = scaleBand(data.map(d => d.category), [12, 348]).padding(0.25)
  const baseline = 148
  const y = scaleLinear([0, max(data, d => d.value)], [baseline, 28])

  const bars = svg.selectAll('g').data(data).join('g')
    .attr('transform', d => `translate(${x(d.category)}, 0)`)

  bars.append('rect')
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => baseline - y(d.value))
    .attr('fill', '#2563eb')

  bars.append('text')
    .attr('x', x.bandwidth() / 2)
    .attr('y', d => y(d.value) - 6)
    .text(d => d.value)

  bars.append('text')
    .attr('x', x.bandwidth() / 2)
    .attr('y', baseline + 20)
    .text(d => d.category)
})
</script>

<template>
  <section>
    <h2>D3.js</h2>
    <svg ref="chart" viewBox="0 0 360 180" role="img" aria-label="Fruit counts by category">
      <title>Fruit counts by category</title>
      <desc>{{ data.map(d => `${d.category}: ${d.value}`).join(', ') }}</desc>
    </svg>
  </section>
</template>

<style scoped>
svg {
  display: block;
  width: 100%;
  text-anchor: middle;
  font-size: 14px;
}
</style>
