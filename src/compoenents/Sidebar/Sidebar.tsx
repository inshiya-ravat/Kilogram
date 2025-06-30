import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div>
      sidebar

      <Link to="/explore">explore</Link>
      <br/>
      <Link to="/reel">reels</Link>
      <br/>
      <Link to="/profile">profile</Link>
      <br/>
      <Link to="/settings">settings</Link>
      <br/>
      <Link to="/chat">chats</Link>
    </div>
  )
}

export default Sidebar
