





// 00 Vendor Libs
import fs from 'fs'
import path from 'path'

// import sizeOf from 'image-size'
import {useRouter} from "next/router"
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

// 01 Vendor Components


// 02 My Libs


// 03 My Components
import MyUnityCanvas from '../components/MyUnityCanvas'

// 04 My Styles




const Doodle = (  {  doodle_props }) => {

    const router = useRouter()

    return (
        <>
            <div style = {{textAlign: 'center', marginTop: '24px', marginBottom: '24px'}}>
                <button onClick={ () => router.push("/") } style={{cursor: 'pointer'}}>Back</button>
            </div>
            <div style = {{textAlign: 'center'}}>
                    <MyUnityCanvas unityContextData={doodle_props.scope.unityContextData} />
            </div>
        </>
    )
}


export default Doodle



export const getStaticPaths = async () => {

  // ROOT
  const root = process.cwd()

  const doodles_localDir = path.join(root, 'public', 'doodles')    // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles

  let doodles_directories = fs.readdirSync(doodles_localDir)
  doodles_directories = doodles_directories.filter(i => i.match(/^\_/g) === null )  // Filter underscore




  // Generate paths
  const genPaths = (d) => {
    const dateRezName = d.split('_')
    const slug = dateRezName[2].replace(/\s+/g, '-').toLowerCase()

    return (
        {
            params: {
                slug: slug
            }
        }
    )

  }

 const paths = doodles_directories.map(genPaths)

    return {
        paths,
        fallback: false
    }

}
















export const getStaticProps = async ({params}) => {

  // ROOT
  const root = process.cwd()

  const doodles_localDir = path.join(root, 'public', 'doodles')    // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles

  let doodles_directories = fs.readdirSync(doodles_localDir)
  doodles_directories = doodles_directories.filter(i => i.match(/^\_/g) === null )  // Filter underscore





// Current current_dir
const current_dir = doodles_directories.filter(d => {

    const dateRezName = d.split('_')
    const slug =  dateRezName[2].replace(/\s+/g, '-').toLowerCase()
    
    return (slug === params.slug)

})[0]    // 211117_1024x768_Drive Mode Camera Transitions



    let customData = {}

    // DOODLE FOLDER
    const doodle_localDir = path.join(root, 'public', 'doodles', current_dir)   // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles\211115_512x512_Ratio
    const doodle_publicDir = path.join('/doodles', current_dir)
    const doodle_content = fs.readdirSync(doodle_localDir)  // \doodles\211117_1024x768_Drive Mode Camera Transitions


    // MDX Gray Matter
    const mdx_localPath = path.join(doodle_localDir, 'index.mdx')
    const {content, data} = matter(fs.readFileSync(mdx_localPath, 'utf-8'))


    // Date / Resolution / Name / Slug
    const dateRezName = current_dir.split('_')
    customData.date = dateRezName[0] ? '20' + dateRezName[0] : 'ERROR'    // ADD TO CUSTOMDATA
    customData.rez = dateRezName[1] ? dateRezName[1] : 'ERROR'     // ADD TO CUSTOMDATA
    customData.name = dateRezName[2] ? dateRezName[2] : 'ERROR'   // ADD TO CUSTOMDATA

    customData.slug = dateRezName[2] ? dateRezName[2].replace(/\s+/g, '-').toLowerCase() : 'ERROR'    // ADD TO CUSTOMDATA


    // UNITY Build
    const build_localPath = path.join(doodle_localDir, 'Build')
    let build_publicPath = path.join(doodle_publicDir, 'Build')
    build_publicPath = build_publicPath.replace(/\\/g, "/")   // /doodles/211117_1024x768_Drive Mode Camera Transitions/Build
    const build_content = fs.readdirSync(build_localPath)

    const buildName = build_content[0].split('.')[0]
    const buildWidth = parseInt(current_dir.split('_')[1].split('x')[0])
    const buildHeight = parseInt(current_dir.split('_')[1].split('x')[1])

    let unityContextData = {}
    unityContextData.loaderUrl = path.join(build_publicPath, `${buildName}.loader.js`).replace(/\\/g, "/") 
    unityContextData.dataUrl = path.join(build_publicPath, `${buildName}.data`).replace(/\\/g, "/") 
    unityContextData.frameworkUrl = path.join(build_publicPath, `${buildName}.framework.js`).replace(/\\/g, "/") 
    unityContextData.codeUrl = path.join(build_publicPath, `${buildName}.wasm`).replace(/\\/g, "/") 
    unityContextData.width = buildWidth
    unityContextData.height = buildHeight


    customData.unityContextData = unityContextData    // ADD TO CUSTOMDATA





    // Serialize
    const mdxSource = await serialize(content, {
        scope: customData
      })





    // const buildPath = path.join(root, 'public', 'doodles', current_dir, 'Build')
    // let content = fs.readdirSync(buildPath)
    // const buildName = content[0].split('.')[0]



    // let width = current_dir.split('_')[1].split('x')[0]
    // let height = current_dir.split('_')[1].split('x')[1]

    // // const unityContext= new UnityContext({
    // //     loaderUrl: "/doodles/211115_512x512_Ratio/Build/output.loader.js",
    // //     dataUrl: "/doodles/211115_512x512_Ratio/Build/output.data",
    // //     frameworkUrl: "/doodles/211115_512x512_Ratio/Build/output.framework.js",
    // //     codeUrl: "/doodles/211115_512x512_Ratio/Build/output.wasm",
    // //   })
    // let unityContextData = {}
    // unityContextData.loaderUrl = path.join('/doodles', current_dir, 'Build', `${buildName}.loader.js`)
    // unityContextData.dataUrl = path.join('/doodles', current_dir, 'Build', `${buildName}.data`)
    // unityContextData.frameworkUrl = path.join('/doodles', current_dir, 'Build', `${buildName}.framework.js`)
    // unityContextData.codeUrl = path.join('/doodles', current_dir, 'Build', `${buildName}.wasm`)

    // unityContextData.width = parseInt(width)
    // unityContextData.height = parseInt(height)
    // //console.log(width)


    return {
        props: {
            doodle_props: mdxSource
        }
    }
}