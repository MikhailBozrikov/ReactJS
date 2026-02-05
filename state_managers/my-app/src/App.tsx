import { Provider } from "react-redux"
import { store } from "./app/store"
import { CustomLayout } from "./components/Layout/CustomLayout"
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <CustomLayout />
    </Provider>
  )
}

export default App