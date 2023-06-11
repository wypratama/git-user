import type { Repo } from "~/types/interfaces"

type Props = {
  repo: Repo
}

export default function Repository({ repo }: Props) {
  return (
    <div className="card w-full bg-secondary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{repo.name}</h2>
        <p>{repo.description}</p>
        {/* <div className="card-actions justify-end">
          <button type="button" className="btn">Buy Now</button>
        </div> */}
      </div>
    </div>
  )
}