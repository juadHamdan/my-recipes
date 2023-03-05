
let allRecipes = []
const filteringOptions = {
    glutenFreeClicked: false,
    dairyFreeClicked: false
}
let pageNum = 1
let currentIngredient = ""

const renderer = new Renderer()
const apiManager = new APIManager()

const alertJqueryObject = $('.alert-container')
const alertMessageJqueryObject = $('.alert')


function fetchAndRenderRecipesByIngredient(){
    apiManager.fetchRecipesByIngredient(currentIngredient, pageNum).then(fetchedRecipes => {
        if(fetchedRecipes.length === 0){
            showTimedMessage("No Matched Recipes", 3000)
            return
        }
        allRecipes = fetchedRecipes
        renderer.renderRecipes(allRecipes)
        console.log(allRecipes)
    }).catch(err => {
        if(pageNum <= 0){
            showTimedMessage("No More Recipes", 2000)
            pageNum = 1
        }
        else{
            showTimedMessage("No More Recipes", 2000)
            pageNum -= 1
        }
    })
}

$(".search-btn").click(function(){
    let inputJqueryObject = $(this).closest("div").find("input")
    let ingredient = inputJqueryObject.val()

    if(!ingredient){
        showTimedMessage("Please Write Ingredient", 2000)
        return 
    }

    currentIngredient = ingredient
    fetchAndRenderRecipesByIngredient()

    inputJqueryObject.val('')
})


$('.recipes').on("click", ".recipe", function(event){
    if(event.target.localName === 'img'){
        return
    }
    window.location.href = $(this).data().href
})


$('.recipes').on("click", ".recipe img", function(){
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


function navigateRight(){
    pageNum += 1
    fetchAndRenderRecipesByIngredient()
}

function navigateLeft(){
    pageNum -= 1
    fetchAndRenderRecipesByIngredient()
}




function showTimedMessage(message, timer){
    alertJqueryObject.css('visibility', 'visible')
    alertMessageJqueryObject.text(message)

    setTimeout(() => {
        alertJqueryObject.css('visibility', 'hidden')
    }, timer)
}