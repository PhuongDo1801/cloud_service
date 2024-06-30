<template>
    <div v-if="visible" class="popup">
        <div :class="['popup-content', typeClass]">
            <span class="close-btn" @click="close">&times;</span>
            <h2 class="popup-title">{{ title }}</h2>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationPopup",
    props: {
        message: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            validator: function(value) {
                return ['success', 'error'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        typeClass() {
            return this.type === 'success' ? 'popup-success' : 'popup-error';
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s;
    z-index: 1000;
}

.popup-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
    max-width: 500px;
    width: 100%;
    height: auto;
    overflow: auto;
}

.popup-success {
    border-left: 10px solid #4CAF50;
}

.popup-error {
    border-left: 10px solid #F44336;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close-btn:hover {
    color: #ff0000;
}

.popup-title {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
}

.popup-content p {
    font-size: 14px;
    color: #333;
    margin: 0;
}
</style>
