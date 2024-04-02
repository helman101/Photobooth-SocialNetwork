import { Spinner } from "react-bootstrap"

interface Props {
  variant: string
}

export const Loader = ({ variant }: Props) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2">
      <Spinner variant={variant} size="sm" className="me-1" />
      Loading...
    </div>
  )
}
