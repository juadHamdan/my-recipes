class Renderer {
    handleBarHelper(sourceSelectorName, templateObject, selectorNameToAppend){
        $(selectorNameToAppend).empty()
        const source = $(sourceSelectorName).html();
        //$(sourceSelectorName).empty()
        const template = Handlebars.compile(source);
        let newHTML = template(templateObject);

        //
        $(selectorNameToAppend).append(newHTML); 
    }
    renderRecipes(recipes) {
        this.handleBarHelper('#recipes-template', {recipes}, '.recipes')
    }
}