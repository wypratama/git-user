import { User } from "~/types/index.type";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="card bg-neutral">
      <div className="card-body">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={user.avatar_url} alt={`user ${user.login} profile`} />
          </div>
        </div>
        <h1 className="card-title"> {user.login} </h1>

      </div>
    </div>
  )
}
