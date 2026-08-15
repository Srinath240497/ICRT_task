<template>
    <div class="chart-wrapper">
        <div class="chart-box" :class="{ 'is-blurred': selectedUser === 'basic' }">
            <Bar :data="chartData" :options="chartOptions" />
        </div>

        <div v-if="selectedUser === 'basic'" class="gate-overlay">
            <div class="gate-card">
                <span class="gate-icon">
                    <img :src="lockIcon" alt="Locked" class="gate-icon-img" />
                </span>
                <h3>Detailed Chart Locked</h3>
                <p>You are on the <strong>Basic Tier</strong>. Upgrade to <strong>Premium</strong> or
                    <strong>Enterprise</strong> to interact with granular product charts.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import lockIcon from '../assets/padlock.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
    name: 'ChartView',
    components: {
        Bar
    },
    props: {
        products: { type: Array, required: true },
        selectedUser: { type: String, required: true }
    },
    data() {
        return {
            lockIcon
        }
    },
    computed: {
        chartData() {
            return {
                labels: this.products.map(item => `${item.brand} - (${item.model})`),
                datasets: [
                    {
                        label: 'Score (0-100)',
                        backgroundColor: '#2563eb',
                        data: this.products.map(item => item.score)
                    },
                    {
                        label: 'TTR (Days)',
                        backgroundColor: '#f59e0b',
                        data: this.products.map(item => item.ttr_days)
                    }
                ]
            };
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            };
        }
    }
}
</script>

<style scoped>
.chart-wrapper {
    position: relative;
    height: 320px;
    width: 100%;
}

.chart-box {
    height: 100%;
    width: 100%;
    transition: filter 0.3s ease;
}

.chart-box.is-blurred {
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
}

.gate-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
}

.gate-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.5rem 2rem;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.gate-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.gate-card h3 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
}

.gate-card p {
    margin: 0 0 1rem;
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.4;
}

.btn-upgrade {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-upgrade:hover {
    background: #1d4ed8;
}

.gate-icon-img {
    width: 36px;
    height: 36px;
    object-fit: contain;
}
</style>