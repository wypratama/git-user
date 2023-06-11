import { Icon } from '@iconify/react';
import { User } from "~/types/index.type";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="radio" name="user-accordion" />
      <div className="collapse-title text-lg font-medium">
        {user.login}
      </div>
      <div className="collapse-content">
        <div className='flex flex-row'>
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar_url} alt={`${user.login} avatar`} />
            </div>
          </div>
          <div>
            <Icon icon="mdi:github" />
            {user.html_url}

          </div>
        </div>
        <div>
          <span>Repositories:</span>
        </div>
      </div>
    </div>
  )
}
