import { Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import FoodRecipes from './pages/FoodRecipes';
import DrinkRecipes from './pages/DrinkRecipes';
import RecipeProgress from './pages/RecipeProgress';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreByNationality from './pages/ExploreByNationality';
import NotFound from './pages/NotFound';
import ExploreIngredients from './pages/ExploreIngredients';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <AppProvider>
        <Switch>
          <Route
            exact
            path="/drinks/:id/in-progress"
            render={ () => <RecipeProgress /> }
          />
          <Route
            exact
            path="/foods/:id/in-progress"
            render={ () => <RecipeProgress /> }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            render={ () => <ExploreByNationality /> }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            render={ () => <ExploreIngredients /> }
          />
          <Route
            exact
            path="/explore/foods/ingredients"
            render={ () => <ExploreIngredients /> }
          />
          <Route exact path="/explore/drinks" render={ () => <ExploreDrinks /> } />
          <Route exact path="/explore/foods" render={ () => <ExploreFoods /> } />
          <Route exact path="/explore" render={ () => <Explore /> } />
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/foods" render={ () => <FoodRecipes /> } />
          <Route exact path="/drinks" render={ () => <DrinkRecipes /> } />
          <Route path="/foods/:id" render={ () => <RecipeDetails /> } />
          <Route path="/drinks/:id" render={ () => <RecipeDetails /> } />
          <Route exact path="/done-recipes" render={ () => <RecipesMade /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route path="/favorite-recipes" render={ () => <FavoriteRecipes /> } />
          <Route
            exact
            path="*"
            render={ () => <NotFound /> }
          />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;

// Tela de login: /;
// Tela principal de receitas de comidas: /foods;
// Tela principal de receitas de bebidas: /drinks;
// Tela de detalhes de uma receita de comida: /foods/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /drinks/{id-da-receita};
// Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
// Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
// Tela de explorar: /explore;
// Tela de explorar comidas: /explore/foods;
// Tela de explorar bebidas: /explore/drinks;
// Tela de explorar comidas por ingrediente: /explore/foods/ingredients;
// Tela de explorar bebidas por ingrediente: /explore/drinks/ingredients;
// Tela de explorar comidas por nacionalidade: /explore/foods/nationalities;
// Tela de perfil: /profile;
// Tela de receitas feitas: /done-recipes;
// Tela de receitas favoritas: /favorite-recipes.
