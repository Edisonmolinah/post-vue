<template>
    <h1>Crear categoria</h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Título</label>
            <input type="text" class="form-control" id="name" v-model="category.name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea class="form-control" id="description" rows="3" v-model="category.description"></textarea>
        </div>
        <button type="button" class="btn btn-success" @click="newCategory">Guardar</button>
    </form>
</template>
<script>
export default {

    data() {
        return {
            category: {
                name: "",
                description: ""
            }
        }
    },
    methods: {
        async newCategory(e) {
            e.preventDefault();
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.category)
            }

            const response = await fetch("http://127.0.0.1:8000/api/category/store", options);
            const data = await response.json();

            console.log(data);
            this.$router.go(0);


        }
    }

}
</script>
<style scoped>
form {
    width: 400px;
    margin: 2em auto;
}

button {
    margin-top: 16px;
}
</style>