<template>
    <div class="service-management">
        <h1>Service Management</h1>
        <input type="text" id="searchInput" placeholder="Search users...">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="serviceTableBody">
                <!-- User data will be dynamically inserted here -->
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "ServiceManagement",
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.service-management {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

input {
    padding: 8px;
    margin-bottom: 10px;
}
</style>