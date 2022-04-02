
import  { useEffect , useLayoutEffect} from 'react';




import '../styles/globals.scss'
import '../styles/normalize.scss'







function MyApp({ Component, pageProps }) {

  // const resizeHandler = () => {
  //   console.log('sss')
  // }

  // useLayoutEffect(() => {
  //   window.addEventListener('resize', resizeHandler)
  // }, [])



  return (
  <>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
