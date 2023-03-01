class APIManager {
    constructor(){
    }

    fetchRecipesByIngredient(ingredient){
        return $.getJSON(`/recipes?filterByIngredient=${ingredient}`)    
            .then(data => {
                return data._recipes
            })
    }
}