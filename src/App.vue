<template>
  <div class="dashboard-wrapper">
    <HeaderNav :category="rawData?.category" v-model="selectedUser" />

    <AggregateStats :stats="rawData?.aggregate_stats" />

    <main class="main-panel">

      <DownloadPanel :selectedUser="selectedUser" @download="handleDownload" />
      <div>
        <div>
          <Bar />
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import AggregateStats from './components/Stats.vue';
import DownloadPanel from './components/DownloadPanel.vue';
import rawData from './constants/data';

export default {
  name: 'App',
  components: {
    HeaderNav,
    AggregateStats,
    DownloadPanel
  },
  data() {
    return {
      rawData,
      selectedUser: "basic"
    };
  },
  methods: {
    handleDownload() {
      if (this.selectedUser !== 'enterprise') return;
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.dashboard-wrapper {
  max-width: 950px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
}

.main-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
</style>
