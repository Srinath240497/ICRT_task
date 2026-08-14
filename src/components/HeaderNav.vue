<template>
    <header class="header">
        <div class="brand">
            <h1>ICRT Dashboard: </h1>
            <span class="badge">{{ category }}</span>
        </div>
        <div class="user-role">
            <label for="user"> Select User Role: </label>
            <select name="user" id="user" class="select-box" :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)">
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
            </select>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderNav',
    props: {
        category: { type: String, required: true },
        modelValue: { type: String, required: true }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.user-role {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
}

.select-box {
    padding: 0.45rem 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: #ffffff;
    font-weight: 600;
    color: #0f172a;
    cursor: pointer;
    outline: none;
}

.select-box:focus {
    border-color: #2563eb;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
    flex-wrap: wrap;
    gap: 1rem;
}

.brand {
    display: flex;
    gap: 0.5rem;
}

.brand h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #0f172a;
}

.badge {
    display: inline-block;
    margin-top: 0.35rem;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 1.0rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
}
</style>