
let allRecipes = []

const filteringOptions = {
    glutenFreeClicked: false,
    dairyFreeClicked: true
}

const renderer = new Renderer()
const apiManager = new APIManager()

/*

$(".search-btn").click(function(){
    let inputJqueryObject = $(this).closest("div").find("input")
    let ingredient = inputJqueryObject.val()

    apiManager.fetchRecipesByIngredient(ingredient).then(fetchedRecipes => {
        allRecipes = fetchedRecipes
        renderer.renderRecipes(allRecipes)
        console.log(allRecipes)
    })

    inputJqueryObject.val('')
})
*/


apiManager.fetchRecipesByIngredient("oil").then(recipes => {
    allRecipes = recipes
    renderer.renderRecipes(allRecipes)
    console.log(allRecipes)
})


function handleRecipeClick(event){

}



$(".recipes").on("click", ".recipe", function(event){
    if(event.target.localName == 'img'){
        return
    }
    window.location.href = $(this).data().href
})


$('.recipes').on("click", ".recipe img", function(){
    console.log("image clicked.")
    const message = $(this).closest('div').siblings('.ingredients').find('li:first-child').text()
    alert(message)
})




function filteredRecipes(){
    const filteredRecipes = allRecipes.filter(recipe => {
        let showRecipe = true

        if(filteringOptions.glutenFreeClicked){
            if(recipe.isGlutenFree){
                return false
            }
        }
        if(filteringOptions.dairyFreeClicked){
            if(recipe.isDairyFree){
                return false
            }
        }
    
        return showRecipe
    })
    renderer.renderRecipes(filteredRecipes)
}


function filterOutGlutenRecipes(event){
    const isChecked = event.target.checked
    isChecked ? filteringOptions.glutenFreeClicked = true : filteringOptions.glutenFreeClicked = false
    filteredRecipes()
}

function filterOutDairyRecipes(event){
    const isChecked = event.target.checked
    isChecked ? filteringOptions.dairyFreeClicked = true : filteringOptions.dairyFreeClicked = false
    filteredRecipes()
}
