<template>
    <div class="panel-header">
        <div>
            <h2>Product Evaluation Comparison</h2>
            <p class="panel-desc">Model performance and testing duration</p>
        </div>
        <div class="action-container">
            <button class="btn-download" :class="{ 'btn-disabled': selectedUser !== 'enterprise' }"
                :disabled="selectedUser !== 'enterprise'" @click="$emit('download')">
                Download PDF Report
            </button>
            <span v-if="selectedUser !== 'enterprise'" class=" sub-hint">
                Enterprise only
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DownloadPanel",
    props: {
        selectedUser: { type: String, required: true }
    },
    emits: ['download']
}
</script>

<style scoped>
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.panel-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #0f172a;
}

.panel-desc {
    margin: 0.2rem 0 0 0;
    font-size: 0.85rem;
    color: #64748b;
}

.action-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-download {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
}

.btn-download:hover:not(:disabled) {
    background: #1e293b;
}

.btn-download.btn-disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
}

.sub-hint {
    font-size: 0.75rem;
    color: #94a3b8;
    font-style: italic;
}
</style>