<template>
    <div id="titulo">
        <h4>Lista de Categorias</h4>
        <button id="button-create" type="button" @click="createCategory()" class="btn btn-primary">Crear categoria</button>
    </div>
    <table class="table">
        <thead>
            <th>Nombre</th>
            <th>Descripción</th>
        </thead>
        <tbody>
            <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>
                    {{category.description}}
                </td>
                <td>
                    <div>
                        <button type="button" @click="editCategory(category.id)" class="btn btn-success">Editar</button>
                        <button type="button" @click="deleteCategory(category.id)" class="btn btn-danger">Eliminar</button>
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

        const response = await fetch("http://127.0.0.1:8000/api/category/all", options);
        const data = await response.json();

        console.log(data);

        this.categories = data.data;
    },
    data() {
        return {
            msg: "Hola mundo",
            categories: [],
        }
    },
    methods: {
        async deleteCategory(id) {
            //console.log(id);
            const options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch("http://127.0.0.1:8000/api/category/" + id + "/destroy", options);
            const data = await response.json();
            // console.log(data.data.newList);
            this.categories = data.data.newList;
            this.$router.go(0);

        },
        editCategory(id) {
            console.log(id)
            this.$router.replace({ path: "/edit-categories/"+id });
        },
        createCategory() {
            this.$router.replace({ path: '/create-categories' });
        }
    }
}

</script>

<style scoped>
    #titulo{
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