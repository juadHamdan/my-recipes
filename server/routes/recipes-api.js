const express = require('express')
const urllib = require('urllib')
const {Recipe, Recipes} = require('./recipes.js')

const router = express.Router()

const RECIPES_BY_INGREDIENT_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/';
const RECIPE_BY_ID_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/id/'
const RECIPES_LIMIT = 6

function fetch(url){
    return urllib.request(url, function(err, response){
            return response
        })
        .then(response => {
            try{
                return JSON.parse(response.data)
            }
            catch{
                throw new Error('Not found')
            }
        })
}

router.get('/recipes/:id', function (req, res) {
    const id = req.params.id

    if(!id){
        res.status(400).send({error: "BadRequest: id query parameter not found."})
        return
    }

    fetch(RECIPE_BY_ID_URL + id)
        .then(recipe => {
            res.send(new Recipe(recipe.idMeal, recipe.title, recipe.ingredients, recipe.thumbnail, recipe.href))
        })
        .catch(err => {
            res.status(404).send({})
        })
})

function getRecipesPatch(recipes, patchNum){
    const numOfPatches = Math.ceil(recipes.length / RECIPES_LIMIT)
    console.log(numOfPatches)

    if(patchNum <= 0 || patchNum > numOfPatches){
        console.log("HERE")
        throw new Error('PatchNum is out of limit')
    }

    const startIndex = (patchNum - 1) * 6
    const endIndex = patchNum * RECIPES_LIMIT

    console.log(startIndex, endIndex)

    return recipes.slice(startIndex, endIndex)
}

router.get('/recipes', function (req, res) {
    const ingredient = req.query?.filterByIngredient
    const patchNum = req.query?.patchNum

    if(!patchNum){
        res.status(400).send({error: "BadRequest: patchNum query not found."})
        return
    }

    if(!ingredient){
        res.status(400).send({error: "BadRequest: filterByIngredient query not found."})
        return
    }

    fetch(RECIPES_BY_INGREDIENT_URL + ingredient)
        .then(data => {
            const fetchedRecipes = data.results
            const recipes = new Recipes()

            fetchedRecipes.forEach(recipe => {
                recipes.addRecipe(new Recipe(recipe.idMeal, recipe.title, recipe.ingredients, recipe.thumbnail, recipe.href))
            });

            res.send(JSON.stringify(getRecipesPatch(recipes._recipes, patchNum)))

        })
        .catch(err => {
            res.status(404).send({})
        })
})

module.exports = router










/*
router.post('/todo', function (req, res) {
    const text = req.body.text
    const newTodo = { text: text, complete: false, priority: PRIORITY.LOW }

    todos.addItem(newTodo)
    res.send(todos.list)
})

router.put('/todo/complete/:todoID', function (req, res) {
    const todoID = req.params.todoID
    const todo = todos.getItem(todoID)
    const newComplete = !(todo.complete) 
    const newTodo = { ...todo, complete: newComplete}

    todos.changeItem(todoID, newTodo)
    res.send(todos.list)
})

router.put('/todo/priority/:todoID', function (req, res) {
    const todoID = req.params.todoID
    const todo = todos.getItem(todoID)
    let newPriority = null

    switch(todo.priority){
        case PRIORITY.LOW:
            newPriority = PRIORITY.MEDIUM
            break
        case PRIORITY.MEDIUM:
            newPriority = PRIORITY.HIGH
            break
        case PRIORITY.HIGH:
            newPriority = PRIORITY.LOW
            break
    }
    const newTodo = { ...todo, priority: newPriority}

    todos.changeItem(todoID, newTodo)
    res.send(todos.list)
})

router.delete('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID

    todos.deleteItemByID(todoID)
    res.send(todos.list)
})

*/