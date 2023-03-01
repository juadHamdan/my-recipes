
let allRecipes = []
const filteringOptions = {
    glutenFreeClicked: false,
    dairyFreeClicked: true
}

const renderer = new Renderer()
const apiManager = new APIManager()

const alertJqueryObject = $('.alert-container')
const alertMessageJqueryObject = $('.alert')

function showTimedMessage(message, timer){
    alertJqueryObject.css('visibility', 'visible')
    alertMessageJqueryObject.text(message)

    setTimeout(() => {
        alertJqueryObject.css('visibility', 'hidden')
    }, timer)
}


$(".search-btn").click(function(){
    let inputJqueryObject = $(this).closest("div").find("input")
    let ingredient = inputJqueryObject.val()

    if(!ingredient){
        showTimedMessage("Please Write Ingredient", 2000)
        return 
    }

    apiManager.fetchRecipesByIngredient(ingredient).then(fetchedRecipes => {
        if(fetchedRecipes.length === 0){
            showTimedMessage("No Matched Recipes", 3000)
            return
        }
        allRecipes = fetchedRecipes
        renderer.renderRecipes(allRecipes)
        console.log(allRecipes)
    })

    inputJqueryObject.val('')
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
