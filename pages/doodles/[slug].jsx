


import Unity, { UnityContext } from "react-unity-webgl";



import fs from 'fs'
import path from 'path'




const Doodle = (  {  unityContextData }) => {



    const style = {
        width: unityContextData.width,
        height: unityContextData.height,

      }
      
    //   console.log(unityContextData.width)
    //   console.log(style)


    if (typeof window !== "undefined") {
        const unityContext= new UnityContext({
          loaderUrl: unityContextData.loaderUrl,
          dataUrl: unityContextData.dataUrl,
          frameworkUrl: unityContextData.frameworkUrl,
          codeUrl: unityContextData.codeUrl,
        });

      }
      else
      {
          return null
      }



    return (

        <div style = {{textAlign: 'center'}}>
                <Unity unityContext={unityContext} 
                    style={style}/>
        </div>

      
    )
   
}


export default Doodle



export const getStaticPaths = async () => {

    const root = process.cwd()


    const dirPath = path.join(root, 'public', 'doodles')

    let directories = fs.readdirSync(dirPath)
    directories = directories.filter(i => i.match(/^\_/g) === null )


    const paths = directories.map(d => {

        const dateSizeTitle = d.split('_')
        const slug = dateSizeTitle[2].replace(/\s+/g, '-').toLowerCase()
        //console.log(slug)

        return ({
            params: {
                slug: slug
            }
        })
    })

    //console.log(paths)
    return {
        paths,
        fallback: false
    }

}


export const getStaticProps = async ({params}) => {

    const root = process.cwd()


    const dirPath = path.join(root, 'public', 'doodles')

    let directories = fs.readdirSync(dirPath)
    directories = directories.filter(i => i.match(/^\_/g) === null )
// Current directory
const directory = directories.filter(d => {

    const dateSizeTitle = d.split('_')

        const slug = dateSizeTitle[2].replace(/\s+/g, '-').toLowerCase()

        return (slug === params.slug)

})[0]



    const buildPath = path.join(root, 'public', 'doodles', directory, 'Build')
    let content = fs.readdirSync(buildPath)
    const buildName = content[0].split('.')[0]



    let width = directory.split('_')[1].split('x')[0]
    let height = directory.split('_')[1].split('x')[1]

    // const unityContext= new UnityContext({
    //     loaderUrl: "/doodles/211115_512x512_Ratio/Build/output.loader.js",
    //     dataUrl: "/doodles/211115_512x512_Ratio/Build/output.data",
    //     frameworkUrl: "/doodles/211115_512x512_Ratio/Build/output.framework.js",
    //     codeUrl: "/doodles/211115_512x512_Ratio/Build/output.wasm",
    //   })
    let unityContextData = {}
    unityContextData.loaderUrl = path.join('/doodles', directory, 'Build', `${buildName}.loader.js`)
    unityContextData.dataUrl = path.join('/doodles', directory, 'Build', `${buildName}.data`)
    unityContextData.frameworkUrl = path.join('/doodles', directory, 'Build', `${buildName}.framework.js`)
    unityContextData.codeUrl = path.join('/doodles', directory, 'Build', `${buildName}.wasm`)

    unityContextData.width = parseInt(width)
    unityContextData.height = parseInt(height)
    //console.log(width)


    return {
        props: {
            unityContextData: unityContextData,
        }
    }
}