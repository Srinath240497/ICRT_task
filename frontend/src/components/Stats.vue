<template>
    <section class="stats-grid">
        <div class="stat-card">
            <span class="stat-label">Average Score:</span>
            <span class="stat-number score">{{ stats?.avg_score }}<small>/100</small></span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Total Tested:</span>
            <span class="stat-number">{{ stats?.total_tested }}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label">Average Time To Result Days:</span>
            <span class="stat-number ttr">{{ stats?.avg_ttr_days }}<small>Days</small></span>
        </div>
    </section>
</template>

<script>
export default {
    name: "AggregateStats",
    props: {
        stats: { type: Object, required: true },
    }
}
</script>

<style scoped>
.stat-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.stat-label {
    display: block;
    font-size: 1.0rem;
    color: #64748b;
    margin-bottom: 0.4rem;
    font-weight: 700;
}

.stat-number {
    font-size: 1.75rem;
    font-weight: 700;
}

.stat-number small {
    font-size: 0.9rem;
    font-weight: normal;
    color: #64748b;
}

.score {
    color: #2563eb;
}

.ttr {
    color: #d97706;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}
</style>