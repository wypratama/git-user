import { Icon } from '@iconify/react';
import { ChangeEventHandler } from 'react';
import useReactive from 'react-use-reactive'
import { Loading, Repository } from '~/components'
import axios from '~/lib/axios'
import type { Repo, User } from "~/types/interfaces";


type Props = {
  user: User
}

type CardState = {
  data: Repo[],
  isLoading: boolean,
  isError: boolean
}

export default function UserCard({ user }: Props) {

  const repos = useReactive<CardState>({
    data: [],
    isLoading: false,
    isError: false
  })

  const fetchRepositories: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      repos.isLoading = true
      console.log(e.target.id)
      const { data } = await axios.get<Repo[]>(`users/${e.target.id}/repos`)
      repos.data = data
    } catch (error) {
      repos.isError = true
      console.log(error)
    } finally {
      repos.isLoading = false
    }
  }

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="user-accordion" onChange={fetchRepositories} id={user.login} />

      <div className="collapse-title text-lg font-medium flex flex-row items-center gap-4">
        {/* <Icon icon="mdi:github" /> */}
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
            <img src={user.avatar_url} alt={`${user.login} avatar`} />
          </div>
        </div> {user.login}
      </div>

      <div className="collapse-content flex flex-col gap-5">

        <div className="card w-full bg-secondary text-primary-content">
          <div className="card-body">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                <img src={user.avatar_url} alt={`${user.login} avatar`} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <span>Repositories:</span>

          <div>
            {repos.isLoading && !repos.isError ? <Loading /> : <div className='flex flex-col gap-5'>{repos.data.map(repo => <Repository repo={repo} />)}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
