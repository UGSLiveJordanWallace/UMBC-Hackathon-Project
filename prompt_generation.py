# -*- coding: utf-8 -*-
"""
Created on Sat Sep 27 18:53:24 2025

@author: nag21
"""

#Start of function
def generateprompt(geolocation, ingredientList, dietaryRestrictions, allergens, numHCMeals):
    """

    Parameters
    ----------
    geolocation : String
        The geolocation of the user in words.
    ingredientList : array of Strings
        An array containing all ingredients that the user specifies are in the user's inventory.
    dietaryRestrictions : array of Strings
        An array containing all dietary restrictions specified by the user.
    allergies : array of Strings
        An array containing all allergens specified by the user.
    numHCMeals : Integer
        The number of home cooked meals that the user specifies as desired.

    Returns
    -------
    finalPrompt: String
        The prompt that will be given to Google Gemini in order to generate a meal plan.

    """
    
    #Create the sentence in the prompt describing the geolocation of the user
    locationStatement = "I live at " + geolocation + ".";
    
    #Create the sentence in the prompt stating the number of home-cooked meals and meals that are eaten dining out
    numHCMealsStatement= "I would like to cook " + str(numHCMeals) + " meals and dine for remaining meals."
    
    #Create the sentence in the prompt listing the dietary restrictions of the user
    dietaryStatement = "I am on a diet that restricts the following: ";
    for index in range(0, len(dietaryRestrictions)):
        dietaryStatement += dietaryRestrictions[index];
        if index < len(dietaryRestrictions) - 1:
            dietaryStatement += ", ";
    dietaryStatement += ".";
    
    #Create the sentence in the prompt listing the allergies of the user
    allergiesStatement = "I have allergies to the following: ";
    for index in range(0, len(allergens)):
        allergiesStatement += allergens[index];
        if index < len(allergens) - 1:
            allergiesStatement += ", ";
    allergiesStatement += ".";
    
    #Create the sentence in the prompt listing the ingredients available for cooking meals in the inventory of the user
    ingredientsStatement = "I have the following ingredients for home-cooked meals: ";
    for index in range(0, len(ingredientList)):
        ingredientsStatement += ingredientList[index];
        if index < len(ingredientList) - 1:
            ingredientsStatement += ", ";
    ingredientsStatement += ".";
    
    #Write the remaining, detailed instructions necessary for Google Gemini to output the desired result
    instructions = "Create a detailed, 7-day meal plan for me, consisting of Breakfast, Lunch, and Dinner, based on nearby dining options. Include health assessments of all meals within the meal plan. The meal plan should be in the format of a table and spreadsheet with categories for 'Day', 'Meal', 'Menu Item', 'Health Assessment', 'Home Cooked or Dine Out'.";
    
    #Combine the sentences to construct the prompt that will be fed into Google Gemini
    finalPrompt = locationStatement + " " + numHCMealsStatement + " " + dietaryStatement + " " + allergiesStatement + " " + ingredientsStatement + " " + instructions;
    
    #Return the final prompt
    return finalPrompt;

#End of function



    
