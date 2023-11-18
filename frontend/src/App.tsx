import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { setupStore } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './themes/theme';
import Loader from './components/Loader';
import Home from './routes/Home';

// TODO: fix
axios.defaults.baseURL = `http://localhost:3000/api`;
axios.defaults.withCredentials = true;

function App() {
  const store = setupStore({});
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        {/*
            HotkeysProvider 設定快捷鍵的 scope 
            'card': 給"單字卡"頁面使用
        */}
        <HotkeysProvider initiallyActiveScopes={['card']}>
          <Loader />
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: 'url("/bg_1920x1080.png")',
            }}
          >
            {
              // <Menus />
            }

            <div
              style={{
                flex: 1,
              }}
              className="h-full m-2 backdrop-blur-md bg-gray-950/60 text-white border-solid border-2 border-gray-600 rounded-lg p-4"
            >
              <RouterProvider router={router} />
            </div>
          </div>
        </HotkeysProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
