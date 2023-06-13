import { Icon } from '@iconify/react';
import { ChangeEventHandler } from 'react';
import useReactive from 'react-use-reactive'
import { Loading, Repository } from '~/components'
import axios from '~/lib/axios'
import type { Repo, User, UserDetail } from "~/types/interfaces";


type Props = {
  user: User
}

type CardState = {
  data: Repo[],
  isLoading: boolean
  isError: boolean
}

type UserState = {
  data: UserDetail | null
  isLoading: boolean
  isError: boolean
}

export default function UserCard({ user }: Props) {

  const repos = useReactive<CardState>({
    data: [],
    isLoading: false,
    isError: false
  })

  const userDetail = useReactive<UserState>({
    data: null,
    isLoading: false,
    isError: false
  })

  const fetchUserData: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      repos.isLoading = true
      userDetail.isLoading = true
      console.log(e.target.id)
      const { data } = await axios.get<Repo[]>(`users/${e.target.id}/repos`)
      const { data: userData } = await axios.get<UserDetail>(`users/${e.target.id}`)
      console.log(userData)
      userDetail.data = userData
      repos.data = data
    } catch (error) {
      repos.isError = true
      console.log(error)
    } finally {
      repos.isLoading = false
      userDetail.isLoading = false
    }
  }

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="user-accordion" onChange={fetchUserData} id={user.login} />

      <div className="collapse-title text-lg font-medium flex flex-row items-center gap-4">
        {user.login}
      </div>

      <div className="collapse-content flex flex-col gap-5">

        <div className="card w-full bg-secondary text-primary-content">
          <div className="card-body flex flex-row gap-3">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                <img src={user.avatar_url} alt={`${user.login} avatar`} />
              </div>
            </div>
            {userDetail.isLoading ? <Loading /> : <div>
              <span>{userDetail.data?.name}</span>
              <div className='flex flex-row gap-1 items-center'>
                <Icon icon="mdi:location" />
                <span>{userDetail.data?.location}</span>
              </div>
            </div>}
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <span>Repositories:</span>

          <div>
            {repos.isLoading && !repos.isError ? <Loading /> : repos.data.length ? <div className='flex flex-col gap-5'>{repos.data.map(repo => <Repository repo={repo} key={repo.id} />)}</div> : <div>This user have no public repository</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
