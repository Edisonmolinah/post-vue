<template>
    <h1>Editar Categoria</h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="category.name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea class="form-control" id="description" rows="3" v-model="category.description"></textarea>
        </div>
        <button type="button" class="btn btn-success" @click="updateCategory">Guardar</button> 
    </form>

</template>

<script>
    export default {
        props:['id'],
        async created(){
            const id = this.$route.params.id;
            
            const options = {
                method: "GET"
            }

            const response = await fetch("http://127.0.0.1:8000/api/category/" + id + "/edit", options);
            const data = await response.json();

            // console.log(data);
            let editCategoryData = {
                name: data.data.name,
                description: data.data.description
            }

            this.category = editCategoryData;
        },
        data(){
            return{
                category: {
                    name: "",
                    description: ""
                }
            }
        },
        methods:{
            async updateCategory(e){
                const id = this.$route.params.id

                e.preventDefault();
                const options = {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(this.category)
            }

                const response = await fetch("http://127.0.0.1:8000/api/category/"+ id +"/update", options);
                const data = await response.json();

                console.log(data);

                this.$router.replace({path: '/categories'});

            }
        }
        
    }
</script>
<style scoped>
    form{
        width: 400px;
        margin: 2em auto;
    }

button {
    margin-top: 16px;
}
</style>