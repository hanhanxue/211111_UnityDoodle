



// 00 Vendor Libs
import fs from 'fs'
import path from 'path'


//const sizeOf = require('image-size')
import sizeOf from 'image-size'
import {useRouter} from "next/router"
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'


// 01 Vendor Components
import Modal from "react-modal"
import NextImage from 'next/image'
import NextLink from 'next/link'


// 02 My Libs


// 03 My Components
import MyUnityCanvas from './components/MyUnityCanvas'



// 04 My Styles
import styles from '../styles/Doodles.module.scss'
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants'




Modal.setAppElement("#__next")


export default function Home( {doodle_props} ) {


  const router = useRouter()


  const filteredDoodle = doodle_props.filter( i => i.scope.slug === router.query.doodleID) 

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      //marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      //verticalAlign: 'bottom',
      lineHeight: 0,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

    }
  };

  return (
    <>
    <main className={`section sectionDefault`}>
    <div className={`wrapper`}> 
    <div className={`letterbox_64_128`}>
    <div className={`tilesContainer textAlignCenter`}>

      {doodle_props.map((doodle, index) => {
        return (
   
            <NextLink 
            key={index}
            href = {`/?doodleID=${doodle.scope.slug}`}   // the page in nextjs that is linked to
            as = {`/doodles/${doodle.scope.slug}`}   // what shows up in the URL
            >
                <a>
                            <div className={`${styles.nextImageDiv} ${styles.BorderMargin_6}`}>
                              <NextImage 
                              src={doodle.scope.coverImage.coverImage_publicPath}
                              width={doodle.scope.coverImage.coverSizeOf.width}
                              height={doodle.scope.coverImage.coverSizeOf.height}
                              />
                            </div>     
                </a>
            </NextLink>

        )
      })}

    </div>
    </div>
    </div>
    </main>


    <Modal 
    isOpen={!!router.query.doodleID} 
    onRequestClose={() => router.push("/")}
    style={customStyles}
    >

    {  filteredDoodle[0] && <MyUnityCanvas unityContextData={filteredDoodle[0].scope.unityContextData} />}
    </Modal>
    </>
  )


}






export const getStaticProps = async() => {

  // ROOT
  const root = process.cwd()


  let doodle_props = [] // 

  const doodles_localDir = path.join(root, 'public', 'doodles')    // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles



  let doodles_directories = fs.readdirSync(doodles_localDir)
  doodles_directories = doodles_directories.filter(i => i.match(/^\_/g) === null )  // Filter underscore






  const genProps = async (d) => {
    
    let customData = {}

    const dateRezName = d.split('_')

    // Date / Resolution / Name / Slug
    customData.date = dateRezName[0] ? '20' + dateRezName[0] : 'ERROR'    // ADD TO CUSTOMDATA
    customData.rez = dateRezName[1] ? dateRezName[1] : 'ERROR'     // ADD TO CUSTOMDATA
    customData.name = dateRezName[2] ? dateRezName[2] : 'ERROR'   // ADD TO CUSTOMDATA

    customData.slug = dateRezName[2] ? dateRezName[2].replace(/\s+/g, '-').toLowerCase() : 'ERROR'    // ADD TO CUSTOMDATA


    // DOODLE FOLDER
    const doodle_localDir = path.join(root, 'public', 'doodles', d)   // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles\211115_512x512_Ratio
    const doodle_publicDir = path.join('/doodles', d)
    const doodle_content = fs.readdirSync(doodle_localDir)  // \doodles\211117_1024x768_Drive Mode Camera Transitions

    // MDX Gray Matter
    const mdx_localPath = path.join(doodle_localDir, 'index.mdx')
    const {content, data} = matter(fs.readFileSync(mdx_localPath, 'utf-8'))


    // COVER Image
    const coverImage = doodle_content.filter(c => c.match(/^cover/g) !== null )[0]

    const coverImage_localPath = path.join(doodle_localDir, coverImage)  // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles\211117_1024x768_Drive Mode Camera Transitions\cover.jpg
    let coverImage_publicPath = path.join(doodle_publicDir, coverImage)
    coverImage_publicPath = coverImage_publicPath.replace(/\\/g, "/")   // /doodles/211117_1024x768_Drive Mode Camera Transitions/cover.jpg


    // COVER Image SIZE
    let coverSizeOf = sizeOf(coverImage_localPath)  ////????? Why can this be CONST? changed to let but const still works
    
    const MAX_WIDTH = 960
    const MAX_HEIGHT = 760

    let ratio

    if (coverSizeOf.width > MAX_WIDTH) {
        ratio = coverSizeOf.height / coverSizeOf.width
        coverSizeOf.width = MAX_WIDTH
        coverSizeOf.height = coverSizeOf.width * ratio
    }
    if (coverSizeOf.height > MAX_HEIGHT) {
        ratio = coverSizeOf.width / coverSizeOf.height
        coverSizeOf.height = MAX_HEIGHT
        coverSizeOf.width = coverSizeOf.height * ratio
    }



    customData.coverImage = {coverImage_publicPath, coverSizeOf}   // ADD TO CUSTOMDATA



    // UNITY Build
    const build_localPath = path.join(doodle_localDir, 'Build')
    let build_publicPath = path.join(doodle_publicDir, 'Build')
    build_publicPath = build_publicPath.replace(/\\/g, "/")   // /doodles/211117_1024x768_Drive Mode Camera Transitions/Build
    const build_content = fs.readdirSync(build_localPath)
    // console.log(build_publicPath)

    const buildName = build_content[0].split('.')[0]
    const buildWidth = parseInt(d.split('_')[1].split('x')[0])
    const buildHeight = parseInt(d.split('_')[1].split('x')[1])

    let unityContextData = {}
    unityContextData.loaderUrl = path.join(build_publicPath, `${buildName}.loader.js`).replace(/\\/g, "/") 
    unityContextData.dataUrl = path.join(build_publicPath, `${buildName}.data`).replace(/\\/g, "/") 
    unityContextData.frameworkUrl = path.join(build_publicPath, `${buildName}.framework.js`).replace(/\\/g, "/") 
    unityContextData.codeUrl = path.join(build_publicPath, `${buildName}.wasm`).replace(/\\/g, "/") 
    unityContextData.width = buildWidth
    unityContextData.height = buildHeight


    customData.unityContextData = unityContextData    // ADD TO CUSTOMDATA


    const mdxSource = await serialize(content, {
      scope: customData
    })

    doodle_props.push(mdxSource)
  }


  await Promise.all(doodles_directories.map(genProps))

  doodle_props = doodle_props.reverse()

  return {
    props: {
      doodle_props,
    }
  }

}