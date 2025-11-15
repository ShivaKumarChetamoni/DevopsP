
import './App.css';
import { lazy, Suspense } from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home'
import RootLayout from './components/RootLayout/RootLayout';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';
import AuthorProfile from './components/AuthorProfile/AuthorProfile';
import AdminProfile from './components/AdminProfile/AdminProfile';
// import NewArticle from './components/AuthorProfile/NewArticle';
import Articles from './components/AuthorProfile/Articles';
import ArticleById from './components/AuthorProfile/ArticleById';
import ReadArticles from './components/UserProfile/ReadArticles';
import ErrorPage from './components/ErrorPage';
import ListOfUsers from './components/AdminProfile/ListOfUsers';
import ListOfAuthors from './components/AdminProfile/ListOfAuthors';
import ListOfArticles from './components/AdminProfile/ListOfArticles';
import { Navigate } from 'react-router-dom';
const NewArticle=lazy(()=>import("./components/AuthorProfile/NewArticle"))
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        },
        {
          path:'/signin',
          element:<SignIn/>
        },
        {
          path:'/userprofile',
          element:<UserProfile/>,
          children:[
            {
              path:'readarticles',
              element:<ReadArticles/>
            },
             {
              path:"article/:articleid",
              element:<ArticleById/>
            },
            {
              path:'',
              element:<Navigate to="readarticles"/>
            }
          ]
        },
        {
          path:'/authorprofile',
          element:<AuthorProfile/>,
          children:[
            {
              path:'view-articles/:username',
              element:<Articles/>
            },
            {
              path:'new-article',
              element:<Suspense fallback="loading">< NewArticle/></Suspense>
            },
            {
              path:"article/:articleid",
              element:<ArticleById/>
            },
            {
              path:'',
              element:<Navigate to="view-articles/:username"/>
            }
          ]

        },
        {
          path:'/adminprofile',
          element:<AdminProfile/>,
          children:[
            {
              path:"list-of-articles",
              element:<ListOfArticles/>
            },
            {
              path:"list-of-authors",
              element:<ListOfAuthors/>
            },
            {
              path:"list-of-users",
              element:<ListOfUsers/>
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
