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

import { defineProps, reactive } from 'vue'

const props = defineProps({
  timestamp: {
    required: true,
    type: Number
  }
})

const diffForHumans = reactive(dayjs.unix(props.timestamp).fromNow())
const humanFriendlyDate = reactive(dayjs.unix(props.timestamp).format('LLLL'))
</script>

<style>

</style>
