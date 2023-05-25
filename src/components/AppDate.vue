<template>
  <span :title="humanFriendlyDate">
    {{ diffForHumans }}
  </span>
</template>

<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

import { defineProps } from 'vue'

const props = defineProps({
  timestamp: {
    required: true,
    type: Number
  }
})

const diffForHumans = dayjs.unix(props.timestamp).fromNow()
const humanFriendlyDate = dayjs.unix(props.timestamp).format('LLLL')
</script>

<style>

</style>
