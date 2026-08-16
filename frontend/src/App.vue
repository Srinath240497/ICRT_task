<template>
  <div class="dashboard-wrapper">
    <HeaderNav :category="rawData?.category" v-model="selectedUser" />

    <AggregateStats :stats="rawData?.aggregate_stats" />

    <main class="main-panel">

      <DownloadPanel :selectedUser="selectedUser" @download="handleDownload" />
      <ChartView :products="rawData?.products" :selectedUser="selectedUser" />
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
import ChartView from './components/ChartView.vue';
import rawData from './constants/data';

const API_BASE = 'http://localhost:3000/api';

export default {
  name: 'App',
  components: {
    HeaderNav,
    AggregateStats,
    DownloadPanel,
    ChartView
  },
  data() {
    return {
      rawData,
      selectedUser: "basic",
      token: '',
      message: ''
    };
  },
  methods: {
    async switchRoleApi(role) {
      try {
        const response = await fetch(`${API_BASE}/auth/switch-role`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role })
        });

        const data = await response.json();
        if (!response?.ok) throw new Error(data?.error || 'Failed to authenticate role');

        this.token = data?.token;
        localStorage.setItem('jwt_token', data?.token);

        this.message = `Switched to ${role} (Token updated)`;

      } catch (err) {
        this.message = `Auth Error: ${err?.message}`;
      }
    },
    async handleDownload() {
      try {
        const response = await fetch(`${API_BASE}/reports/download/${this.selectedUser}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        const data = await response.json();

        if (!response?.ok) {
          throw new Error(data?.message || data?.error || 'Download Error');
        }

        this.message = `Success: ${data?.message}`;
      } catch (err) {
        this.message = `Download Failed: ${err?.message}`;
      }
    }
  },
  watch: {
    selectedUser(newRole) {
      this.switchRoleApi(newRole);
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
