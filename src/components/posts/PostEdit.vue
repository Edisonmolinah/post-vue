<template>
    <h1>Editar Post</h1>
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
            
            <label for="description" class="form-label">Estado actual: <b>{{post.state}}</b></label>
            <br/>
            <input type="radio" :value="'No Publicado'" v-model="post.state" :key="2" /> No Publicado
            <input type="radio" :value="'Publicado'" v-model="post.state" :key="1" /> Publicado
            <br />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Contenido</label>
            <textarea class="form-control" id="description" rows="3" v-model="post.content"></textarea>
        </div>
        modifica la Categoria
        <select name="" id="category.id" v-model="post.category_id">
            <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }}</option>
        </select>
        <br/>
        <button type="button" class="btn btn-success" @click="updatepost">Guardar</button>
    </form>

</template>

<script>
export default {
    props: ['id'],
    async created() {
        const id = this.$route.params.id;

        const options = {
            method: "GET"
        }

        const response = await fetch("http://127.0.0.1:8000/api/post/" + id + "/edit", options);
        const data = await response.json();

        // console.log(data);
        let editpostData = {
            name: data.data.name,
            description: data.data.description,
            state: data.data.state,
            content: data.data.content,
            category_id: data.data.category_id
        }
        this.state = editpostData.state;
        console.log(editpostData);
        this.post = editpostData;

        const options1 = {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('authToken')
            },
        }

        const response1 = await fetch("http://127.0.0.1:8000/api/category/all", options1);
        const data1 = await response1.json();


        this.categories = data1.data;


    },
    data() {
        return {
            state: "",
            category_id: "",
            categories: [],
            post: {
                name: "",
                description: "",
                category_id: "",
                content: "",
                state: ""
            }
        }
    },
    methods: {
        async updatepost(e) {
            const id = this.$route.params.id

            e.preventDefault();
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.post)
            }

            const response = await fetch("http://127.0.0.1:8000/api/post/" + id + "/update", options);
            const data = await response.json();

            console.log(data);

            this.$router.replace({ path: '/posts' });

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