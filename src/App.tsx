import './App.css'
import { User } from './types/index.type'
import { FormEventHandler } from 'react'
import useReactive from 'react-use-reactive'
import { UserCard } from '~/components'
import axios from '~/lib/axios'

function App() {
  const state = useReactive<{
    searchInput: string;
    users: User[]
  }>({
    searchInput: '',
    users: []
  })

  const searchUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(state.searchInput)
    if (!state.searchInput) return
    const response = await axios.get<{
      incomplete_results: boolean
      items: User[]
      total_count: number
    }>(`search/users?q=${state.searchInput}`)
    console.log(response)
    state.users = response.data.items
  }


  return (
    <div className='container mx-auto py-8 px-4'>

      <form onSubmit={searchUser}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>search icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="search" id="default-search" placeholder="Type username" className="block input input-bordered input-lg w-full p-4 pl-10" value={state.searchInput} onInput={(e) => { state.searchInput = (e.target as HTMLInputElement).value }} />

          <button type="submit" className="btn btn-primary absolute right-2.5 bottom-2">Search</button>
        </div>
      </form>

      <div className='flex flex-col gap-3 mt-4'>
        {state.users.length ? state.users.map(user => <UserCard key={user.id} user={user} />) : null}
      </div>

    </div>
  )
}

export default App
