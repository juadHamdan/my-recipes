class APIManager {
    constructor(){
    }

    fetchRecipesByIngredient(ingredient, patchNum){
        console.log(ingredient)
        return $.getJSON(`/recipes?filterByIngredient=${ingredient}&patchNum=${patchNum}`)    
            .then(data => {
                console.log(data)
                return data
            })
    }
}