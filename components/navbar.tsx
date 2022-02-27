const Navbar: () => JSX.Element = () => {
  return (
    <div>
      <span>اکسیر</span>
      <style jsx>{`
        span {
          width: 100%;
          max-height: 70px;
          font-size: 2rem;
          font-family: 'Lalezar', cursive;
        }
        div {
          text-align: center;
          border-bottom: solid;
          border-bottom-width: thin;
        }
      `}</style>
    </div>
  )
}

export default Navbar
