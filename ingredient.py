import json



with open('ingredient.json') as theJson:  
    data = json.load(theJson)
    ingredientList = []

for recipe in data:

    try:
        ingredients = data[recipe]['ingredients']
        
        for ingred in ingredients:
            if("cups" in ingred):
                newIngred = ingred.split("cups",1)[1]
            elif("cup" in ingred):
                newIngred = ingred.split("cup",1)[1]
            elif("ounces" in ingred):
                newIngred = ingred.split("ounces",1)[1]
            elif("ounce" in ingred):     
                newIngred = ingred.split("ounce",1)[1]
            try:
                newIngred = newIngred.split(")",1)[1]
                newIngred = newIngred.split(",",2)[0]
            except:
                pass
            
            ingredientList.append(newIngred)
    except:
        pass


print(len(ingredientList))
uniqueIngredientList = set(ingredientList) 
uniqueIngredientList = list(uniqueIngredientList)
print(len(uniqueIngredientList))
