import { User } from "~/types/index.type";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="collapse collapse-arrow bg-neutral">
      <input type="radio" name="user-accordion" />
      <div className="collapse-title text-lg font-medium">
        {user.login}
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  )
}
