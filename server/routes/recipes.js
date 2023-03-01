const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]

function arrHasDuplicates(arr){
    return arr.length != new Set(arr).size
}

function ingredientsAreGlutenFree(ingredient){
    return arrHasDuplicates([...ingredient, ...glutenIngredients])
}

function ingredientsAreDairyFree(ingredient){
    return arrHasDuplicates([...ingredient, ...dairyIngredients])
}

class Recipe{
    constructor(id, title, ingredients, thumbnail, href){
        this.id = id
        this.title = title
        this.ingredients = ingredients
        this.thumbnail = thumbnail
        this.href = href
        this.isGlutenFree = ingredientsAreGlutenFree(ingredients)
        this.isDairyFree = ingredientsAreDairyFree(ingredients)
    }
}

class Recipes{
    constructor(){
        this._recipes = []
    }

    get recipes(){
        return this._recipes
    }

    addRecipe(recipe){
        this._recipes.push(recipe)
    }
}

module.exports = {Recipe, Recipes}
