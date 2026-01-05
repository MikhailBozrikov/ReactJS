import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BaseLayout } from './components/ui/BaseLayout/BaseLayout'
import { RestaurantRatingPage } from './components/pages/RestaurantRatingPage/RestaurantRatingPage'
import { UserContext } from './contexts/UserContext'

const queryClient = new QueryClient()

const user = {
  name: 'John Doe',
  avatar: '/avatar.png'
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <BaseLayout>
          <RestaurantRatingPage />
        </BaseLayout>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default App