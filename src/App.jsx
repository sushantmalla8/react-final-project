
import './App.css';
import Login from './elements/Login/Login';
import Register from './elements/Register/Register';
import Dashboard from './elements/Dashboard/Dashboard';
import Profile from './elements/Profile/Profile';
import Contact from './elements/Contact/Contact';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import MyRecipe from './elements/MyRecipe/MyRecipe';
import RecipeList from './elements/RecipeList/RecipeList';
import RecipeUpdate from './elements/RecipeUpdate/RecipeUpdate';



function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-recipe' element={<MyRecipe />} />
          <Route path='/recipe-list' element={<RecipeList />} />
          <Route path='/recipe-edit/:recipeId' element={<RecipeUpdate />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
