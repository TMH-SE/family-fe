import React, { Suspense, lazy } from 'react'
// import HomePage from '../pages/homepage'
import { Route, Switch } from 'react-router-dom'
import { MainLayout } from '../layouts'

import { routersAuth } from './auth'
import { Skeleton } from 'antd'

// export const ThemeContext = React.createContext({
//   isDark: false,
//   toggleTheme: () => {}
// })
const Routers = () => {
  // const [isDarkTheme, setIsDarkTheme] = useState(false)
  // const toggleTheme = (value = !isDarkTheme) => {
  //   setIsDarkTheme(value)
  //   custome(value)
  // }
  // const custome = (value) => {
  //   const color = value ? '#FFF' : '#333'
  //   const backgroundColor = value ? '#44484C' : 'aliceblue'
  document.body.style.backgroundColor = 'aliceblue'
  //   document.body.style.backgroundColor = backgroundColor
  //   const cards = document.getElementsByClassName('ant-card')
  //   for (let i = 0; i < cards.length; i++) {
  //     console.log(cards[i].style, 'card', backgroundColor)
  //     // cards[i].style.background = backgroundColor
  //     cards[i].setAttribute('style', `background: ${backgroundColor} !important`)
  //   }
  // }

  return (
    // <ThemeContext.Provider value={{ isDark: isDarkTheme, toggleTheme }}>
    <MainLayout>
      <Suspense fallback={<Skeleton active/>}>
        <Switch>
          {routersAuth.map((item) => (
            <Route
              key={item.name}
              exact={item.exact}
              path={item.path}
              component={lazy(() => import(`../pages/${item.component}`))}
            />

          ))}

        </Switch>
      </Suspense>
    </MainLayout>
    // </ThemeContext.Provider>
  )
}

export default Routers
