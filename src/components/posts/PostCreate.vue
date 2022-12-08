<template>
    <h1>Crear Post</h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="post.name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea class="form-control" id="description" rows="3" v-model="post.description"></textarea>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Estado</label>
            <br />
            <input type="radio" :value="2" v-model="post.state" :key="2" /> NO Publicado
            <input type="radio" :value="1" v-model="post.state" :key="1" /> Publicado
            <br />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Contenido</label>
            <textarea class="form-control" id="description" rows="3" v-model="post.content"></textarea>
        </div>
        selecciona la Categoria
        <select name="" id="category.id" v-model="post.category_id">
            <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }}</option>
        </select>
        <br/>
        <button type="button" class="btn btn-success" @click="newpost">Guardar</button>

    </form>

</template>
<script>
export default {

    async created() {
        //console.log("Este es el token", localStorage.getItem('authToken'));
        const options = {
            method: "GET",
            headers: {
            },
        }

        const response = await fetch("http://127.0.0.1:8000/api/category/all", options);
        const data = await response.json();

        console.log(data);

        this.categories = data.data;
    },
    data() {
        return {
            category_id: "",
            categories: [],
            post: {
                name: "",
                description: "",
                state: "",
                content: "",
                category_id: "",
            }
        }
    },
    methods: {
        async newpost(e) {
            e.preventDefault();
            console.log(this.post)

            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.post)
            }

            const response = await fetch("http://127.0.0.1:8000/api/post/store", options);
            const data = await response.json();

            console.log(data);

            this.$router.go(0);

        }
    },

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