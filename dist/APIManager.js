class APIManager {
    constructor(){
    }

    fetchRecipesByIngredient(ingredient, patchNum){
        return $.getJSON(`/recipes?filterByIngredient=${ingredient}&patchNum=${patchNum}`)    
            .then(data => {
                return data
            })
    }
}