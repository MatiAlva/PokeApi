import Head from "next/head"
import { Navbar } from "../ui"

interface Props  {
    children?: JSX.Element,
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layouts:React.FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Alvarez Matias" />
            <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
            <meta name="keyword" content={`${title}, pokemon, pokedex`} />
            <meta property="og:title" content={`Indormacion sobre ${title}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`}/>
        </Head>

        <Navbar />

        <main style={{padding: '0 20px'}}>
            {children}
        </main>
    </>
  )
}
