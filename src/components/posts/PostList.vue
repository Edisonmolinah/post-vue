<template>
    <div>
        <h1>Lista de Posts</h1>
        <button id="button-create" type="button" @click="createPost()" class="btn btn-primary">Crear Post</button>
    </div>
    <table class="table">
        <thead>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Contenido</th>
            <th>Fecha Creacion</th>
            <th>Fecha Modificacion</th>
        </thead>
        <tbody>
            <tr v-for="post in posts" :key="post.id">
                <td>{{ post.name }}</td>
                <td>{{ post.description }}</td>
                <td>{{ post.state }}</td>
                <td>{{ post.content }}</td>
                <td>{{ post.created_at }}</td>
                <td>{{ post.updated_at }}</td>
                <td>
                    <div>
                        <button type="button" @click="editPost(post.id)" class="btn btn-success">Editar</button>
                        <button type="button" @click="deletepost(post.id)" class="btn btn-danger">Eliminar</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    async created() {
        //console.log("Este es el token", localStorage.getItem('authToken'));
        const options = {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('authToken')
            },
        }

        const response = await fetch("http://127.0.0.1:8000/api/post/all", options);
        const data = await response.json();

        console.log(data);

        this.posts = data.data;
    },
    data() {
        return {
            msg: "Hola mundo",
            posts: [],
        }
    },
    methods: {
        async deletepost(id) {
            //console.log(id);
            const options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch("http://127.0.0.1:8000/api/post/" + id + "/destroy", options);
            const data = await response.json();
            // console.log(data.data.newList);
            this.posts = data.data.newList;
            this.$router.go(0);

        },
        editPost(id) {
            console.log(id)
            this.$router.replace({ path: "/edit-post/"+id });
        },
        createPost() {
            this.$router.replace({ path: '/create-post' });
        }
    }
}

</script>
<style scoped>
    div{
        padding: 16px;
            
    }
    table{
        margin: 2em auto;
        margin-left: 2em;
    }
    button{
        margin-left: 8px;
    }
    
</style>